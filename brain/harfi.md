---
title: HARFI
parent: Brain
layout: gallery-item
summary: High angular resolution functional imaging for fMRI
repo: https://github.com/MASILab/HARFI_Singularity
license: "MIT License"
---

HARFI (High Angular Resolution Functional Imaging) extends the idea of high angular resolution diffusion imaging to functional MRI, estimating orientation-dependent functional correlations. The processing pipeline (the MATLAB source lives in [HARFI_Scripts](https://github.com/MASILab/HARFI_Scripts)) is provided as a pre-built Singularity container.

## Usage

The pre-built Singularity container is available on [Zenodo](https://zenodo.org/records/15376547) (DOI: [10.5281/zenodo.15376547](https://doi.org/10.5281/zenodo.15376547)). Provide the fMRI image, brain mask, and reference image in an input directory, then:

```bash
singularity run \
    --bind [INPUT_DIR]:/input,[OUTPUT_DIR]:/output \
    [PATH_TO_HARFI_SIF_FILE] \
    [R] [DISCRETE] [TR] [N] \
    [FMRI_IMAGE_NAME] [BRAIN_MASK_NAME] [REFERENCE_IMAGE_NAME] [OUTPUT_NAME]
```

where `R` is the radius of integration (voxels), `DISCRETE` the discrete steps in integration, `TR` the repetition time (seconds), and `N` the number of volumes to remove from the beginning. The outputs are `OUTPUT_NAME.mat` (parameters and results), `OUTPUT_NAME.nii.gz` (correlation maps), and `OUTPUT_NAME_SH_even4.nii.gz` (FODs).

{: .citation}
Zhiyuan Li, Kurt G. Schilling, and Bennett A. Landman. "Robust containerization of the High Angular Resolution Functional Imaging (HARFI) pipeline" [Neuroinformatics](https://link.springer.com/article/10.1007/s12021-026-09769-2), 2026.
