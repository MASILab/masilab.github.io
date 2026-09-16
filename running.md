---
title: Running the tools
layout: default
nav_order: 3
---

# Running the tools

Nearly every tool in this gallery is distributed as a container image. You do not
install its dependencies; you download one file and run it. The usage example on
each tool's page assumes the conventions below, so it only shows what is specific
to that tool.

## Apptainer and Singularity are the same runtime

Apptainer is the renamed continuation of Singularity after the project moved to
the Linux Foundation. On most systems `apptainer` and `singularity` are
interchangeable, and many installations still provide `singularity` as an alias.

{: .note}
Pages in this gallery use whichever command the tool's authors tested against. If
your cluster provides only one of the two, substitute it — the flags are the same.

## `run` versus `exec`

This is the other difference you will notice between pages, and it is not
cosmetic:

- `apptainer run image.sif ARGS` executes the image's own entry point. Tools that
  wrap a complete pipeline — [SLANT](/brain/slant/), [PreQual](/brain/prequal/) —
  are built this way, so you pass pipeline arguments and nothing else.
- `apptainer exec image.sif COMMAND` runs a command you name inside the image.
  Tools that expose several entry points — [MAP T1 Mapping](/brain/mapt1/) runs a
  simulation and then an image-creation step, [Diffusion Smoothing](/brain/dss/)
  registers and then filters — use this, so the command is part of the example.

## The flags

| Flag | What it does |
|:-----|:-------------|
| `-e`, `--cleanenv` | Runs without inheriting your shell's environment variables, so a stray `PYTHONPATH` or `LD_LIBRARY_PATH` can't reach inside and change the result. |
| `-c`, `--contain` | Uses the image's own filesystem rather than mounting your home directory and working directory. Combined as `-ec` in some examples. |
| `-B host:container` | Bind-mounts a directory from your machine to a path inside the image. This is how data gets in and results get out. Repeat it per directory. |
| `--nv` | Exposes NVIDIA GPUs and drivers to the container. Needed by the deep-learning tools. |
| `--home DIR` | Sets `$HOME` inside the container, which some pipelines write scratch files into. |

Together, `-e --contain` plus explicit `-B` mounts is what makes a run
reproducible: the container sees exactly the directories you named and nothing
else about your machine.

## Inputs and outputs

The convention across these tools is an input directory and an empty output
directory, bound to fixed paths inside the image — usually `/INPUTS` and
`/OUTPUTS`, though the exact paths differ per tool and are given in each example.
Create the output directory yourself before running; the container generally will
not create it for you.

## Where the images live

Container images are too large for GitHub, so each tool hosts its image wherever
made sense at the time:

| Tool | Image | Hosted on |
|:-----|:------|:----------|
| [SLANT](/brain/slant/) | `docker://vuiis/slant:deep_brain_seg_v1_0_0` | Docker Hub, pulled at run time |
| [PreQual](/brain/prequal/) | `prequal.simg` | [Zenodo](https://doi.org/10.5281/zenodo.18624309) |
| [MAP T1 Mapping](/brain/mapt1/) | `map_t1_mapping.sif` | [Zenodo](https://doi.org/10.5281/zenodo.15306164) |
| [Diffusion Smoothing](/brain/dss/) | `dss_fmri_atlas.sif` | [NITRC](https://dss_fmri_atlas.projects.nitrc.org/) |
| [Vasculature Smoothing](/brain/vss/) | — | No container; runs from a conda environment |

A Zenodo DOI pins one exact build of an image forever, which is what you want in a
methods section. A Docker Hub tag can be rebuilt under the same name, so record
the digest if you need to reproduce a run years later.

## Citing

Every tool page ends with a Citation callout naming the paper that introduced the
method. Cite that paper, not this site. Where a tool builds on someone else's
work — the smoothing filters here build on Abramian et al. — the callout lists
those references too, and they belong in your citation as well.

## Adding a tool

Lab members: a tool page is one Markdown file with front matter, and the gallery
card, the sidebar entry and the home page all build themselves from it. The
[repository README](https://github.com/MASILab/masilab.github.io) has the front
matter template and the conventions to follow — in particular, provide an
apptainer invocation and a container that someone outside the lab can actually
download.
