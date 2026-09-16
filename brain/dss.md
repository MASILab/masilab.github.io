---
title: Diffusion Smoothing
parent: Brain
layout: gallery-item
summary: Diffusion-informed spatial smoothing (DSS) atlas for fMRI
image: /assets/images/brain/dss.png
repo: https://github.com/MASILab/dss_fmri_atlas
license: "MIT License"
---

Diffusion-informed spatial smoothing (DSS) is a valuable tool for white matter fMRI, where BOLD signals are weaker in power and anisotropically oriented, so the isotropic Gaussian smoothing used for gray matter fMRI averages out much of the signal. [Abramian et al.](https://doi.org/10.1016/j.neuroimage.2021.118095) introduced a graph signal processing approach that smooths white matter fMRI with smoothing windows shaped by diffusion information, but it needs paired diffusion and fMRI data. The DSS atlas provided here enables anatomically-informed smoothing when diffusion data is not available, using the Human Connectome Project Young Adult population-averaged fiber orientation directions.

## Usage

The recommended way to use the DSS atlas is the Singularity container. Download `dss_fmri_atlas.sif` from the [NITRC project page](https://dss_fmri_atlas.projects.nitrc.org/), then:

```bash
# 1. Register the fMRI to the HCP-YA template
singularity exec -ec \
    -B /path/to/inputs:/INPUTS \
    -B /path/to/outputs:/OUTPUTS \
    /path/to/dss_fmri_atlas.sif register_to_template.sh \
    --input_fmri /INPUTS/fmri.nii.gz \
    --output_fmri /OUTPUTS/fmri_reg_to_template.nii.gz \
    --input_t1w /INPUTS/t1w.nii.gz

# 2. Apply the DSS filter
singularity exec -ec \
    -B /path/to/inputs:/INPUTS \
    -B /path/to/outputs:/OUTPUTS \
    /path/to/dss_fmri_atlas.sif apply_dss_filter.sh \
    --input_fmri /OUTPUTS/fmri_reg_to_template.nii.gz \
    --output_fmri /OUTPUTS/filtered_fmri.nii.gz \
    --n 5 --alpha 0.9 --beta 50 --n_jobs 15
```

The two steps are separate so any preprocessing can be applied in HCP-YA space in between. Python code and pregenerated filter windows are also available; see the [repository](https://github.com/MASILab/dss_fmri_atlas).

{: .citation}
Adam M. Saunders, Michael E. Kim, Kurt G. Schilling, John C. Gore, Bennett A. Landman, and Yurui Gao. "Vasculature-informed spatial smoothing of white matter functional magnetic resonance imaging" In Medical Imaging 2025: Image Processing, International Society for Optics and Photonics, 2025. [https://doi.org/10.1117/12.3047140](https://doi.org/10.1117/12.3047140)
<br /><br />
F.C. Yeh. "Population-based tract-to-region connectome of the human brain and its hierarchical topology" [Nature Communications](https://doi.org/10.1038/s41467-022-32595-4), 2022.
<br /><br />
David Abramian, Martin Larsson, Anders Eklund, Iman Aganj, Carl-Fredrik Westin, and Hamid Behjat. "Diffusion-informed spatial smoothing of fMRI data in white matter using spectral graph filters" [NeuroImage](https://doi.org/10.1016/j.neuroimage.2021.118095), 2021.
