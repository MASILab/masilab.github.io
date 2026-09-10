# MASI Lab Gallery

## Local installation and usage

Install Ruby and Bundler on your system. The default version of Ruby found in Ubuntu's apt repository is outdated.

```bash
sudo apt install libffi-dev libyaml-dev
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash
source ~/.bashrc
rbenv install 3.3
rbenv global 3.3.12
```

Change the directory to this project and set the path to a local directory.Then install the dependencies for this project:

```bash
bundle config set --local path 'vendor/bundle'
bundle install
```

Run the site locally and you should see the site at `http://localhost:4000/`:

```bash
bundle exec jekyll serve
```

## Adding pages

To add a tool, create a page at `<category>/tool-name.md`. This page is a Markdown file that will be converted to HTML. The page should contain the following front matter, with changes as appropriate to your tool:

```yaml
---
title: SLANT
parent: Brain
layout: gallery-item
summary: The original BrainCOLOR segmentation from T1-weighted MRI
image: /assets/images/brain/slant.jpg
repo: https://github.com/MASILab/SLANTbrainSeg
license: "BSD 3-Clause License"
---
```

Make sure to include an example image at `/assets/images/<category>/<tool>.png`. Then, provide usage instructions and citations for your tool. See `brain/slant.md` for an example.

In particular, we want to focus on providing instructions for `apptainer` since that is the easiest way for people to reproduce our computing environment. Make sure the container is downloadable somewhere, either with a `.simg` or `.sif` file link on Zenodo, or (less preferred) a Docker Hub reference.

You can use `{: .citation}`, `{: .warning}` and `{: .note}` to add callouts to highlight important points. Especially consider adding a citation with a link to your paper.

After you have made your edits, push the changes to GitHub. The GitHub Action should automatically build your site. Within 10 minutes, you should see your changes at `https://masilab.github.io/<category>/<tool-name>`

## Configuration

You can look for more configuration info for the theme at [Just the Docs](https://just-the-docs.com/)
