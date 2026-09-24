---
title: Connectome Special
parent: Brain
layout: gallery-item
summary: Probabilistic tractography and graph measures (connectome) from dMRI
repo: https://github.com/nancynewlin-masi/ConnectomeSpecial
license: "See repository"
---

Connectome Special runs probabilistic tractography (MRtrix iFOD2) on a white matter FOD, anatomically constrained with a 5-tissue-type mask from the associated structural image, and maps the resulting streamlines to a connectome. The connectome dimensions are set by the [SLANT](/brain/slant) atlas (labels in `/SUPPLEMENTAL/slant_origlabels.txt`). Outputs include global and nodal graph measures (computed with the Brain Connectivity Toolbox), connectomes weighted by number of streamlines, average streamline length (mm), and average FA, plus a QA document.

## Usage

The pipeline is wrapped in a Singularity container (the recipe is in the [repository](https://github.com/nancynewlin-masi/ConnectomeSpecial/tree/main/SINGULARITY)). Input directories must contain PreQual-preprocessed diffusion data and SLANT segmentations; bind them as follows:

```bash
singularity run \
    --bind ${workingpath}/PreQual/:/DIFFUSION/,${workingpath}/Slant/:/SLANT/,${workingpath}/Output/:/OUTPUTS/ \
    ${singularity_path}
```

By default the script generates 10 million streamlines (see Newlin et al. 2023, cited below, on the robustness of streamline count to graph measures). The `main.sh` wrapper in the repository handles directory binding and job-array execution.

{: .citation}
Nancy R. Newlin, Francois Rheault, Kurt G. Schilling, and Bennett A. Landman. "Characterizing streamline count invariant graph measures of structural connectomes" [Journal of Magnetic Resonance Imaging](https://onlinelibrary.wiley.com/doi/abs/10.1002/jmri.28631), 2023.
<br /><br />
Jean-Christophe Tournier, et al. "MRtrix3: A fast, flexible and open software framework for medical image processing and visualisation" [NeuroImage](https://www.sciencedirect.com/science/article/pii/S1053811918307768), 2019.
