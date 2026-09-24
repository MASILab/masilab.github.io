---
title: DeepMSMT-CSD
parent: Brain
layout: gallery-item
summary: Learning multi-shell MT-CSD FODs from single-shell DW-MRI
repo: https://github.com/MASILab/spie_2020_mtcsd_dl
license: "See repository"
---

This repository contains the code written for learning multi-tissue constrained spherical deconvolution (MT-CSD) multi-shell fiber orientation distribution (FOD) reconstruction from single-shell DW-MRI, released with the 2020 SPIE paper. It includes the model training and inference entry points (`main_files/`), data generation utilities (`data_gens/`), and model weights (`models/`).

## Usage

The workflow is Python-based: clean and generate training data with the scripts in `data_cleaning_stuff/` and `data_gens/`, train with `main_files/main_patch_smt_dl.py` (or the volume-fraction variant `main_patch_volfrac_dl.py`), and evaluate with `main_files/main_scsd_acc.py`. Model weights are in `models/`. See the [repository](https://github.com/MASILab/spie_2020_mtcsd_dl) for environment setup; no pre-built container is currently published, so run the code from a standard deep-learning Python environment.

{: .citation}
Vishwesh Nath, Sudhir K. Pathak, Kurt G. Schilling, Walter Schneider, and Bennett A. Landman. "Deep learning estimation of multi-tissue constrained spherical deconvolution with limited single shell DW-MRI" In [Medical Imaging 2020: Image Processing](https://doi.org/10.1117/12.2549455), International Society for Optics and Photonics, 2020.
