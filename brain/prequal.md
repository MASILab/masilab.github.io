---
title: PreQual
parent: Brain
layout: gallery-item
summary: Integrated preprocessing and quality assurance of diffusion weighted MRI
image: /assets/images/brain/prequal.png
repo: https://github.com/MASILab/PreQual
license: "Vanderbilt License"
---

{: .note}
PreQual can invoke [Synb0-DisCo](https://github.com/MASILab/Synb0-DISCO) to correct susceptibility-induced distortions without reverse phase-encoded images or field maps.

PreQual is an automated pipeline for integrated preprocessing and quality assurance of diffusion weighted MRI (dMRI) images. It combines MP-PCA denoising, distortion and motion correction, and bias-field correction with an extensive battery of quality assurance metrics.

## Usage

With the diffusion MRI files (`.nii.gz`, `.bval`, and `.bvec`) and a `dtiQA_config.csv` configuration file in `./input`, and an empty `./output` directory. A pre-built container is available on [Zenodo](https://zenodo.org/records/18624309) (DOI: [10.5281/zenodo.18624309](https://doi.org/10.5281/zenodo.18624309)):

```bash
apptainer run \
    -e \
    --contain \
    --home ./input \
    -B ./input:/INPUTS \
    -B ./output:/OUTPUTS \
    -B /tmp:/tmp \
    ./prequal.simg \
    i
```

Replace `i` with the phase-encoding axis for your data (`i` or `j`). To enable Synb0-DisCo distortion correction or GPU-accelerated `eddy`, additionally bind the FreeSurfer license (`-B /path/to/license.txt:/APPS/freesurfer/license.txt`) and CUDA (`--nv -B /path/to/cuda:/usr/local/cuda`), as described in the [repository README](https://github.com/MASILab/PreQual).

The final preprocessed volume will be in `./output/PREPROCESSED/dwmri.nii.gz`, and the quality assurance report will be in `./output/PDF/dtiQA.pdf`.

## Config file

`dtiQA_config.csv` (which must be named exactly) contains one line per input image, giving the shared file prefix, the phase-encoding direction, and the readout time:

| Column | Description | Example |
|:-------|:------------|:--------|
| `image` | Shared file prefix of the corresponding `.nii.gz`, `.bval`, and `.bvec` files (no path) | `dti1` |
| `pe_dir` | Phase-encoding direction along the axis given above: `+` or `-` | `+` |
| `readout_time` | Effective readout time (seconds) used to scale the estimated b0 field in FSL's `eddy`; `0` means infinite bandwidth (no susceptibility distortion) | `0.05` |

For two images in `./input`:

```csv
dti1,+,0.05
dti2,+,0.05
```

Note that the phase-encoding axis, direction, and readout time are not stored in NIFTI headers, so they must be known in advance (for example, from the scan protocol or the JSON sidecars created when converting DICOMs with dcm2niix).

{: .citation}
Leon Y. Cai, Qi Yang, Colin B. Hansen, Vishwesh Nath, Karthik Ramadass, Graham W. Johnson, Benjamin N. Conrad, Brian D. Boyd, John P. Begnoche, Lori L. Beason-Held, Andrea T. Shafer, Susan M. Resnick, Warren D. Taylor, Gavin R. Price, Victoria L. Morgan, Baxter P. Rogers, Kurt G. Schilling, and Bennett A. Landman. "PreQual: An automated pipeline for integrated preprocessing and quality assurance of diffusion weighted MRI images" [Magnetic Resonance in Medicine](https://onlinelibrary.wiley.com/doi/full/10.1002/mrm.28678), 2021.
