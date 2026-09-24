---
title: Francois Special
parent: Brain
layout: gallery-item
summary: Fusion of four tractography/connectome pipelines (TractoFlow, RBx-Flow, Tractometry-Flow, Connectoflow)
repo: https://github.com/MASILab/francois_special_spider
license: "See repository"
---

Francois Special is a fusion of four pipelines: Tractoflow, RBx-Flow, Tractometry-Flow, and Connectoflow. Given PreQual-preprocessed diffusion data (`.nii.gz`, `.bval`, `.bvec`), a T1 image, and SLANT labels, it runs a full connectomics workflow: FOD estimation, probabilistic tractography, and connectome and tractometry construction, with reporting (`report.html`, `report.pdf`) and QC.

## Usage

The repository ships with a Singularity recipe (`singularity/singularity_recipe_francois_special.def`) and the code in `code/`. Inputs are assumed to be PreQual-preprocessed, with a b-value in the range 800-1200 and at least 12 directions (tensor) or 800-3000 and at least 32 directions (fODF). Key parameters are documented in the [repository README](https://github.com/MASILab/francois_special_spider) (`sh_order`, `dti_shells`, `fodf_shells`, `pft_seed`, `local_seed`, `algo`, `nb_run`, `vote_ratio`). The pipeline was optimized for bundles with large spatial extent extracted with RecoBundlesX from the [RecoBundlesX atlas](https://zenodo.org/record/4630660); to fully QA the data, inspect the label maps in [MI-Brain](https://www.imeka.ca/mi-brain/).

The pipeline builds on the following:

{: .citation}
Guillaume Theaud, Jean-Charles Houde, Antoine Bor, Francois Rheault, Francis Morency, and Maxime Descoteaux. "TractoFlow: A robust, efficient and reproducible diffusion MRI pipeline leveraging Nextflow & Singularity" [NeuroImage](https://www.sciencedirect.com/science/article/pii/S1053811919305963), 2020.
