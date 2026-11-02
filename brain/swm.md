---
title: Superficial WM
parent: Brain
layout: gallery-item
summary: Lobar short association fiber tractography and diffusion metric summaries from diffusion MRI
image: /assets/images/brain/swm.jpg
---

The **superficial white matter (SWM)** pipeline processes diffusion MRI to generate superficial white matter tractography, lobar short association fiber (SAF) bundles, and diffusion metric summaries. It ships as a single Singularity/Apptainer container — `superficial_WM.sif` — hosted on [Zenodo](https://zenodo.org/records/23813418).

Derived inputs that are not supplied are generated automatically: without FreeSurfer outputs the container runs FreeSurfer reconstruction on a T1-weighted image from the inputs, and without FA/MD/AD/RD maps it computes them with MRtrix. Fiber-wise free-water metrics can be provided to include those measurements in the summaries.

## Usage

Place the data in a directory named `test_input` with exactly these names:

```
test_input/
├── dwmri.nii.gz
├── dwmri.bval
├── dwmri.bvec
├── mask.nii.gz
├── orig.mgz                     # FreeSurfer outputs (else run from a T1)
├── aseg.mgz
├── brain.mgz
├── aparc.a2009s+aseg.mgz
├── aparc+aseg.mgz
└── metrics/
    ├── dwmri%fa.nii.gz          # DTI maps (else computed with MRtrix)
    ├── dwmri%md.nii.gz
    ├── dwmri%ad.nii.gz
    ├── dwmri%rd.nii.gz
    └── freewater_single*.nii.gz # fiber-wise free-water metrics (optional)
```

The diffusion data should already be preprocessed — the pipeline performs no motion, eddy-current, or susceptibility-distortion correction — and any supplied metric maps must be aligned in physical space to the diffusion data. If FreeSurfer needs to be run, pass a license file by adding `-B /absolute/path/to/license.txt:/opt/freesurfer/license.txt:ro` before the image name (replace `singularity` with `apptainer` where appropriate).

With `superficial_WM.sif` alongside `test_input`:

```bash
mkdir -p test_output test_tmp
set -o pipefail

singularity run -e -c \
  -B "$(pwd)/test_input:/INPUT" \
  -B "$(pwd)/test_output:/OUTPUT" \
  -B "$(pwd)/test_tmp:/tmp" \
  --home /tmp \
  superficial_WM.sif 2>&1 | tee swm_run.log
```

Use separate output and temporary directories for each subject and run — the pipeline copies inputs into the output directory and starts all stages again on each invocation — and retain `swm_run.log` with the results. Full requirements, input details, and current limitations are documented in the [Zenodo record](https://zenodo.org/records/23813418).

## Outputs

Results are written to `test_output/`: lobar SAF tractograms (`SAF_lobes/*_OR.tck`), per-bundle track-density images (`SAF_lobes_TDI/*_TDI.nii.gz`), binary bundle masks (`SAF_lobes_mask/*_mask.nii.gz`), and per-bundle, per-map metric summaries (`ALL_Metrics_JSON/*.json`), together with the whole-tractogram `tracks_2mio.tck`, `U_density_1mm.nii.gz`, `b0.nii.gz`, `connectome.csv`, and `assignments.txt`. Bundle names use the eight lobar groups F, FP, O, PO, P, PT, T, and OT (frontal, frontoparietal, occipital, parieto-occipital, parietal, parietotemporal, temporal, and occipitotemporal), each split by hemisphere (L/R), for 16 requested bundle groups. The tractogram uses 2,000,000 streamlines with a minimum length of 5 mm and a maximum length of 40 mm.

{: .citation}
Chloe Cho, Maxime Chamberland, Francois Rheault, Daniel Moyer, Bennett A. Landman, and Kurt G. Schilling. "Microstructural Characterization of Short Association Fibers Related to Long-Range White Matter Tracts in Normative Development" [Human Brain Mapping](https://doi.org/10.1002/hbm.70255), 46.8 (2025): e70255. Container: [Zenodo](https://zenodo.org/records/23813418), 2026.
