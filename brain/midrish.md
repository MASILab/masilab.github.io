---
title: MidRISH
parent: Brain
layout: gallery-item
summary: Cross-site harmonization of diffusion MRI via rotationally invariant harmonics
repo: https://github.com/nancynewlin-masi/MidRISH
license: "See repository"
---

MidRISH harmonizes multi-shell diffusion MRI across sites using rotationally invariant spherical harmonics (RISH). In two stages, it first creates a population template: the signal is modeled as a spherical harmonic representation (the user sets the maximum order), the rotationally invariant harmonics are computed, the RISH features are registered to MNI space (e.g., with FSL `epi_reg` or ANTs), and a template combining all RISH features is computed. The template is then applied to harmonize new data, producing a reconstructed signal function and a fitted tensor model.

## Usage

The code is a set of Python and shell scripts with the following dependencies: MRtrix, ScilPy, Python 3.8, FSL, and FSL FLIRT. See the [repository](https://github.com/nancynewlin-masi/MidRISH) for the full walkthrough (template creation with `Get_RISH_Features.py` and `Compute_Template.py`, and template application with `Apply_Template_to_DWI.sh`).

Note that RISH works best when the input data are projected to the same b-value; the reference data fall within 500 < b < 1500, and large b-value jumps are not supported at this time.

{: .citation}
Nancy R. Newlin, Michael E. Kim, Praitayini Kanakaraj, Tianyuan Yao, Timothy J. Hohman, Kurt Pechman, Lori L. Beason-Held, Susan M. Resnick, Derek B. Archer, Angela L. Jefferson, Bennett A. Landman, and Daniel M. Moyer. "MidRISH: Unbiased harmonization of rotationally invariant harmonics of the diffusion signal" [Magnetic Resonance Imaging](https://doi.org/10.1016/j.mri.2024.03.033), 2024 (preprint: [bioRxiv](https://doi.org/10.1101/2023.08.12.553099), 2023).
