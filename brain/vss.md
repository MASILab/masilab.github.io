---
title: Vasculature Smoothing
parent: Brain
layout: gallery-item
summary: Vasculature-informed spatial smoothing (VSS) for fMRI
image: /assets/images/brain/vss.png
repo: https://github.com/MASILab/vss_fmri
license: "MIT License"
---

Vasculature-informed spatial smoothing (VSS) is a filter for white matter functional MRI based on susceptibility-weighted imaging (SWI). Instead of isotropic Gaussian smoothing, the smoothing windows are shaped by peak vasculature directions, so signal is preserved along the vessels that generate it. The repository also provides the diffusion-informed spatial smoothing (DSS) filter of [Abramian et al.](https://doi.org/10.1016/j.neuroimage.2021.118095).

## Usage

Create a Python environment and install the package from the repository:

```bash
conda env create --name vss_fmri -f environment.yml
pip install .
```

Peak vasculature directions are obtained from SWI with a Frangi filter (see the paper for details). To apply the VSS filter:

```bash
python apply_vss_filter.py \
    --peaks $wm_peaks \
    --wm_mask $wm_mask \
    --adj_matrix $adj_matrix \
    --fmri_data $input_fmri \
    --output $output_fmri \
    --n 5 --alpha 0.8 --beta 50 --n_jobs 15
```

The DSS variant is available as `apply_dss_filter.py` in the [repository](https://github.com/MASILab/vss_fmri). No pre-built container is published; run from the conda environment.

{: .citation}
Adam M. Saunders, Michael E. Kim, Kurt G. Schilling, John C. Gore, Bennett A. Landman, and Yurui Gao. "Vasculature-informed spatial smoothing of white matter functional magnetic resonance imaging" In Medical Imaging 2025: Image Processing, International Society for Optics and Photonics, 2025. [https://doi.org/10.1117/12.3047140](https://doi.org/10.1117/12.3047140)
<br /><br />
David Abramian, Martin Larsson, Anders Eklund, Iman Aganj, Carl-Fredrik Westin, and Hamid Behjat. "Diffusion-informed spatial smoothing of fMRI data in white matter using spectral graph filters" [NeuroImage](https://doi.org/10.1016/j.neuroimage.2021.118095), 2021.
