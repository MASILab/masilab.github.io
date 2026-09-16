---
title: MAP T1 Mapping
parent: Brain
layout: gallery-item
summary: Maximum a posteriori quantitative T1 mapping with uncertainty estimation
image: /assets/images/brain/mapt1.png
repo: https://github.com/MASILab/map_t1_mapping
license: "MIT License"
---

MAP T1 mapping computes maximum a posteriori (MAP) quantitative T1 maps from MP2RAGE data, with uncertainty estimation. A Monte Carlo simulation characterizes the likelihood, from which point-estimate, MAP (with or without a relative-likelihood threshold), T1-weighted, expected value, standard deviation, and variance maps can be created.

## Usage

A pre-built Singularity image is available on [Zenodo](https://zenodo.org/records/15306164) (DOI: [10.5281/zenodo.15306164](https://doi.org/10.5281/zenodo.15306164)). Pull the image directly from the [record](https://zenodo.org/records/15306164/files/map_t1_mapping.sif) — no separate download needed; the image is cached (default: `~/.apptainer/cache/tarballs/`, configurable with `APPTAINER_CACHE_DIR`) and re-used on later pulls:

```bash
# 0. Pull the container from Zenodo
apptainer pull https://zenodo.org/records/15306164/files/map_t1_mapping.sif

# 1. Run the Monte Carlo simulation
singularity exec \
    -e --contain \
    -B /home/.../inputs:/inputs \
    -B /home/.../outputs:/outputs \
    -B /home/.../sim_outputs:/sim_outputs \
    map_t1_mapping.sif \
    python /code/run_mp2rage_simulation.py \
    --params_path /inputs/params.yml \
    --sim_output_path /sim_outputs/monte_carlo.npy \
    --num_trials 1000000 \
    --num_process 15 \
    --noise_std 0.005

# 2. Create the images
singularity exec \
    -e --contain \
    -B /home/.../inputs:/inputs \
    -B /home/.../outputs:/outputs \
    -B /home/.../sim_outputs:/sim_outputs \
    map_t1_mapping.sif \
    python /code/create_image.py \
    --params_path /inputs/params.yml \
    --input_folder /inputs \
    --output_folder /outputs \
    --num_process 15 \
    --image_type likelihood \
    --monte_carlo_path /sim_outputs/monte_carlo.npy
```

Input data must follow the `subject/scan/..._real_tXXXX.nii.gz` structure described in the [repository](https://github.com/MASILab/map_t1_mapping), along with a `params.yml` file of acquisition parameters. For example:

```yaml
TR: 0.006  # Repetition time of the gradient echo readout in s
MP2RAGE_TR: 8.25  # Delay between the two MP2RAGE inversions in s
flip_angles:  # Flip angles of gradient echo pulses in deg
  - 4
  - 4
  - 4
inversion_times:  # Time from inversion pulse to middle of each gradient echo readout
  - 1.010
  - 3.310
  - 5.610
n:  # Number of pulses within each gradient echo readout; one int, or two for before and after center of k-space
  - 225
eff: 0.84  # Inversion pulse efficiency of scanner
likelihood_threshold: 0.5  # Relative-likelihood threshold for the likelihood method of T1 mapping
```

The number of flip angles and inversion times must be equal. `create_image.py` supports the image types `point`, `likelihood`, `map`, `t1w`, `robust_t1w`, `ev`, `std`, and `var` (all except `point` and `t1w` require the Monte Carlo simulation). The repository can also be used directly as a Python package (`pip install -e .`).

{: .citation}
Adam M. Saunders, Michael E. Kim, Chenyu Gao, Lucas W. Remedios, Aravind R. Krishnan, Kurt G. Schilling, Kristin P. O'Grady, Seth A. Smith, and Bennett A. Landman. "Comparison and calibration of MP2RAGE quantitative T1 values to multi-TI inversion recovery T1 values" [Magnetic Resonance Imaging](https://doi.org/10.1016/j.mri.2025.110322), 117 (2025): 110322.
