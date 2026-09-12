# CLAIM ZERO1
## Package · Publish · Provision · Prove · Pipeline

**Programme:** Codewrkx  
**Document type:** Short-path Cloud Delivery Course  
**Project:** `claim-zero` (starter workspace provided)  
**Region:** `us-east-1` only  
**Focus:** Docker → Amazon ECR → Terraform → Amazon ECS → GitHub CI/CD  

---

# Welcome — your first steps into cloud engineering

This course is here to help you **break into cloud**. You will take practical first steps toward cloud engineering on **AWS**: package an application, publish it, provision real infrastructure, prove it is live, then connect GitHub so a push builds and deploys the same app.

You do not start by scaffolding an app from scratch. You receive a ready Visual Studio Code project where the application work is already done, so your time goes into the cloud delivery path:

| Already finished for you | What that means |
|--------------------------|-----------------|
| React application | The product exists and builds |
| Starter workspace | Open the provided folder and work from that single bench |

Your mission starts at the moment delivery becomes cloud-shaped:

> Package the app into a Docker image, publish it to Amazon ECR, provision real AWS infrastructure with Terraform, prove the site is live in a browser, then let GitHub trigger the same build and deploy.

A mini local check, then five stages. One region. One public URL. No app-scaffolding detours.

```text
╔══════════════════════════════════════════════════════════════╗
║           CLAIM ZERO CLOUD SPRINT (Stages 0–5)               ║
╠══════════════════════════════════════════════════════════════╣
║  0  Local App Smoke Check             (npm build + dev)        ║
║  1  Application Containerisation      (Docker + nginx)       ║
║  2  Container Image Publishing        (Amazon ECR)           ║
║  3  Infrastructure Provisioning       (Terraform → ECS/EC2)  ║
║  4  Application Deployment & Validation (Browser proof)      ║
║  5  GitHub CI/CD                      (CodePipeline → ECS)   ║
╚══════════════════════════════════════════════════════════════╝

  [Starter]─►[0 Smoke]─►[1 Package]─►[2 Publish]─►[3 Provision]─►[4 Prove]─►[5 Pipeline]
               npm         Docker         ECR          IaC         Live URL     GitHub
```

By the end you will be able to say:

> I containerised the app, published `claim-zero:latest` to ECR, applied infrastructure as code, verified the running service at a public HTTP endpoint, and connected GitHub so a push rebuilds and redeploys that same service.

---

# What is already in your starter project

Open the provided project folder in **Visual Studio Code**. Treat that folder as your single workshop bench.

**Expected starter readiness:**

- Project opens in VS Code with the React app already present  
- You can run a local production build if needed (`npm run build`)  
- Docker Desktop, AWS CLI v2, Terraform 1.15.x, and Git are installed on your workstation  
- You have a **GitHub** account (free plan is enough)  
- AWS Console habit: Region **`us-east-1`**

**You will create in this course:** `Dockerfile`, `.dockerignore`, the local image, ECR publish steps, `terraform/main.tf`, the live validation, `buildspec.yml`, and a Free Tier GitHub → CodePipeline → ECS path.

**First:** Stage 0 confirms the starter React app still builds and runs locally (`npm run build`, then `npm run dev`) before you package anything.

---

# How this course works

Every **Stage** opens with orientation and closes with a quality gate.

Every **Lab** uses:

1. **Objective** — what you will achieve  
2. **Why this matters / Command Context** — what the action means  
3. **Procedure** — numbered steps (follow exactly)  
4. **Verification** — how you confirm success  
5. **Troubleshooting** — likely errors and fixes  

**Rules of the road**

- Region is **`us-east-1` only**  
- Resource names are canonical: image `claim-zero:latest`, ECR repo `claim-zero`, cluster `claim-zero-cluster`, service `claim-zero-service`, pipeline `claim-zero-pipeline`, CodeBuild project `claim-zero-build`  
- Never save AWS access keys in project files, screenshots you share, or chat messages  
- After Stage 5, destroy the stack (`terraform destroy`) so compute does not keep running. Do **not** destroy after Stage 4 — the pipeline needs the live ECS service.  

**Directory navigation (`cd` and `cd ..`)**

Workshop commands assume a specific folder. The **project root** is the folder that contains `package.json` (and later `Dockerfile`).

- `cd foldername` moves **into** that folder (for example `cd terraform`).  
- `cd ..` moves **up one level** — back to the parent folder.  
- If you are still in the wrong place, run `cd ..` again until you reach the folder you need.  
- Check the path shown in the terminal prompt before you paste a command.

**Stopping a running process (Ctrl + C)**

Some commands occupy the terminal until you stop them — especially `npm run dev`. When you need to type another command in the **same** terminal, click in that terminal and press **Ctrl + C** on the keyboard. Wait until the normal prompt returns. Do not close Visual Studio Code; only stop that process.  

### Restaurant analogy (same story, shorter path)

| Technical concept | Restaurant meaning |
|-------------------|--------------------|
| React application (starter) | The meal |
| Docker | Standardised packaging |
| Container image | Packaged meal |
| Amazon ECR | Distribution / storage centre |
| Terraform | Temporary restaurant construction blueprint |
| EC2 + ECS | Building shell + operational kitchen |
| Public IP URL | Service counter |
| Browser | Customer |
| GitHub | Recipe book (source of truth) |
| CodePipeline | Head chef calling the stations |
| CodeBuild | Prep station that packages the meal |

---

# Engineering standards for this sprint

| Standard | Detail |
|----------|--------|
| Starter project | Use the provided VS Code project (app already done) |
| Create packaging yourself | Author `Dockerfile` and `.dockerignore` from this guide |
| Naming | Use the names in this document **exactly** |
| Region | **`us-east-1` only** |
| Out of scope | Fargate, Application Load Balancer, NAT Gateway, CodePipeline V2, CodeBuild medium/large, AWS Academy Learner Lab |
| Teardown | After Stage 5, run `terraform destroy` and confirm EC2 is terminated |

### AWS Cost Considerations

This sprint uses Free Tier–aligned building blocks (`t3.micro`, short-lived public IP, **one** CodePipeline V1, CodeBuild `BUILD_GENERAL1_SMALL`). Apply → verify → destroy in **one sitting**. Leaving EC2 running overnight can consume credits or incur charges.

Stage 5 stays in Free Tier only if you keep **one** V1 pipeline, **SMALL** CodeBuild, **1–2 pipeline runs**, no VPC on CodeBuild, and destroy the same day. Do not add Fargate, an ALB, or NAT.

---

# STAGE 0 — Local application smoke check (mini stage)

### Stage Overview

Stage 0 is a short local check. Confirm the starter React app still builds and still runs in the browser **before** you package it with Docker.

### Where We Came From

You opened the provided VS Code project. The React application is already present.

### Where We Are Now

You will run a production build, start the local development server, view the page, then stop the server so the terminal is free for Stage 1.

### Where We Are Going

A working local app is the baseline for Stage 1 containerisation. If the app does not build on your machine, the Docker build will fail at the same step.

### Why This Stage Matters

Catch Node and build problems on the laptop first. That is faster than debugging the same error inside a Docker build.

### What We Will Prove

`npm run build` succeeds, and `npm run dev` serves the landing page in a browser.

### SOFTWARE DELIVERY PROGRESS: ✓ Starter ready → ► 0 Smoke check → □ 1 Package → □ 2 Publish → □ 3 Provision → □ 4 Prove → □ 5 Pipeline

---

## Lab 0.1 — Production build (`npm run build`)

### Objective

Confirm the starter React app compiles into static files.

### Command Context

`npm run build` runs the Vite production build. A successful build writes output to `dist/` and proves Node can compile the app on your machine.

### Procedure

1. Open a terminal in VS Code (**Terminal → New Terminal**).  
2. Confirm you are in the **project root** (the folder that contains `package.json`).  
   - If you are inside a subfolder, run `cd ..` to move up one level. Repeat `cd ..` if you still need to go up another level.  
3. Run the production build. This compiles the React app into static files in `dist/` and then returns the prompt:

```bash
npm run build
```

4. Wait until the command finishes and the prompt returns.

### Verification

- Confirm the build completes without error.  
- **Expected State:** Local production build works.

### Troubleshooting References

¹ **Symptom:** `npm: command not found`, or the build fails because packages are missing.  
  **Resolution:** Install Node.js if needed. From the project root run `npm install`, then retry `npm run build`.  
² **Symptom:** Wrong folder (`package.json` not found).  
  **Resolution:** Run `cd ..` until you are in the folder that contains `package.json`, then retry.

---

## Lab 0.2 — Development server (`npm run dev`)

### Objective

Confirm the app serves in a browser from the Vite development server.

### Command Context

`npm run dev` starts Vite’s local development server. It **keeps running** until you stop it. The page is typically at `http://localhost:5173`.

### Procedure

1. Confirm you are still in the **project root**. If you are inside a subfolder, run `cd ..` to go up one level.  
2. Start the development server. This command occupies the terminal until you stop it:

```bash
npm run dev
```

3. Wait until the terminal shows a local URL (usually `http://localhost:5173`).  
4. Open a browser and go to that URL.  
5. Confirm the Codewrkx landing page loads.  
6. When you are done viewing the page, **stop the server** so you can type Stage 1 commands in the same terminal: click in the terminal, then press **Ctrl + C** on the keyboard.  
7. Confirm the prompt has returned (the server is no longer running).

### Verification

- Confirm the landing page loaded locally.  
- Confirm the terminal is free again after **Ctrl + C**.  
- **Expected State:** App works on your machine; terminal ready for Stage 1.

### Troubleshooting References

¹ **Symptom:** Terminal will not accept new commands.  
  **Resolution:** The dev server is still running. Press **Ctrl + C** once. If it does not stop, press **Ctrl + C** again until the prompt returns.  
² **Symptom:** Page does not load.  
  **Resolution:** Use the URL printed in the terminal; wait a few seconds; confirm Lab 0.1 succeeded.

### Stage Completion Criteria

Do not continue until all checks pass:

- [ ] `npm run build` succeeded from the project root  
- [ ] `npm run dev` showed the landing page  
- [ ] Dev server stopped with **Ctrl + C**; terminal is free for Stage 1  

### What We Have Accomplished

You proved the starter React app builds and runs on your machine.

### Where We Are Going Next

Stage 1 packages this same app into a Docker image so runtime no longer depends on Node on the laptop.

---

# STAGE 1 — Application Containerisation

### Stage Overview

Stage 1 packages your React production build into a portable container image and verifies it locally.

### Where We Came From

Your starter project already gives you a building React app (you proved that in Stage 0). Runtime still depends on your laptop’s Node environment until you package it.

### Where We Are Now

You will author a multi-stage Dockerfile and `.dockerignore`, build `claim-zero:latest`, and prove the page at `http://localhost:8080`.

### Where We Are Going

A verified local image becomes the artefact Stage 2 publishes to Amazon ECR so ECS can pull it.

### Restaurant Context

Standardised packaging turns a finished meal into a sealed unit that tastes the same in every kitchen. Docker is that packaging. The image is the packaged meal. You taste it at home (`localhost:8080`) before sending it to the distribution centre (ECR).

### Technical Context

A container image is a portable filesystem plus metadata describing how to run a process — not a full virtual machine. Your multi-stage Dockerfile uses **Node** only in a builder stage to compile static assets, then copies `dist/` into a slim **nginx** runtime image that listens on port **80**.

### Why nginx?

Vite’s production output is static HTML, CSS, and JavaScript. nginx is a mature, lightweight HTTP server well suited to serving static files. Keeping Node in the final image would ship build tooling you no longer need, increasing size and attack surface. Multi-stage builds keep the factory (Node) separate from the retail shelf (nginx).

### Why Docker (and why not upload React files directly)?

Uploading source or `dist/` folders by hand to a server does not travel well across environments and skips a reproducible build. A container image is the standardised unit ECS expects to pull from a registry. Local verification before cloud publishing catches packaging mistakes early.

### Why This Stage Matters

ECS will not run your laptop Node process. Without a correct image, Stages 2–4 have nothing valid to store or launch.

### What We Will Build

`Dockerfile`, `.dockerignore`, and a locally verified image tagged `claim-zero:latest`.

### Architecture Snapshot

```text
Starter project (React already done)
                │
                ▼
         Docker build
                │
                ▼
         Image: claim-zero:latest
                │
                ▼
         Local verify: http://localhost:8080
```

### SOFTWARE DELIVERY PROGRESS: ✓ Starter ready → ✓ 0 Smoke check → ► 1 Package → □ 2 Publish → □ 3 Provision → □ 4 Prove → □ 5 Pipeline

### Learning Outcomes

- Author a multi-stage Dockerfile for a Vite React app  
- Use `.dockerignore` to keep the build context lean  
- Build and run an image locally on port 8080→80  
- Explain why nginx serves the production static build  

### Key Terminology

| Term | Meaning |
|------|---------|
| Dockerfile | Recipe of instructions to build an image |
| Image | Immutable packaged artefact (your packaged meal) |
| Container | A running instance of an image |
| Build context | Files sent to Docker daemon during `docker build` |
| Multi-stage build | Separate build and runtime stages in one Dockerfile |

---

## Lab 1.1 — Confirm Docker Engine readiness

### Objective

Confirm Docker Desktop is running before you build or run images.

### Why this lab exists

Docker commands talk to a local engine (daemon). If Docker Desktop is stopped, every build and run fails with “Cannot connect to the Docker daemon.”

### Procedure

1. Open **Docker Desktop**.  
2. Wait until the engine status shows **running**.

### Verification

- Confirm Docker Desktop reports the engine as running.  
- **Expected State:** Docker ready to build and run.

### Troubleshooting References

¹ **Symptom:** Cannot connect to Docker daemon.  
  **Resolution:** Start Docker Desktop; wait for the engine; retry.

---

## Lab 1.2 — Create `Dockerfile`

### Objective

Create a new `Dockerfile` in the project root and paste the multi-stage production recipe from this course guide.

### Why nginx?

The final stage uses `nginx:alpine` to serve `/usr/share/nginx/html` on port 80. That matches how static Vite builds are served in many production pipelines: compile once, serve with a dedicated web server.

### Procedure

1. Right-click the project root in Explorer.  
2. Click **New File**.  
3. Name the file exactly `Dockerfile`.  
4. Open `Dockerfile`.  
5. Paste the content below from this course guide.  
6. Press **Ctrl + S**.

```dockerfile
# ----- Stage 1: compile the React application into static files (dist/) -----
# node:22-alpine = small Linux Node image used ONLY for building (not the final runtime).
# Alpine keeps the builder small; the compiled files are copied out in Stage 2.
FROM node:22-alpine AS builder

# Working directory inside the build container. Later COPY/RUN paths are relative to /app.
WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching.
# If package.json does not change, Docker can reuse the npm install layer.
COPY package*.json ./

# Install dependencies required to compile the application.
RUN npm install

# Copy the full application source into the build context.
# .dockerignore (Lab 1.3) keeps node_modules, dist, and docs out of this copy.
COPY . .

# Produce optimised static assets in /app/dist (HTML/CSS/JS).
# This is the same production build you already proved locally in Stage 0.
RUN npm run build

# ----- Stage 2: serve the compiled assets with nginx -----
# Fresh slim image — no Node, no npm, only a web server.
# Everything above the second FROM is discarded except what you COPY --from=builder.
FROM nginx:alpine

# Replace default nginx web root with the Vite build output from the builder stage.
COPY --from=builder /app/dist /usr/share/nginx/html

# Document that the container listens on HTTP port 80.
# Lab 1.5 maps laptop port 8080 to this container port 80.
EXPOSE 80

# Start nginx in the foreground (required for containers — no background daemon).
CMD ["nginx", "-g", "daemon off;"]
```

### Verification

- Confirm the project root contains a saved `Dockerfile`.  
- **Expected State:** Image recipe on disk.

### Troubleshooting References

¹ **Symptom:** Later build looks for a different filename.  
  **Resolution:** File must be named exactly `Dockerfile` in the project root.

---

## Lab 1.3 — Create `.dockerignore`

### Objective

Create `.dockerignore` so local folders that should not enter the build context are excluded.

### Why this lab exists

Everything in the project folder (except ignored paths) is sent to the Docker daemon as build context. Excluding `node_modules`, `dist`, and docs keeps builds faster and images cleaner.

### Procedure

1. Right-click the project root.  
2. Click **New File**.  
3. Name the file `.dockerignore`.  
4. Paste the content below from this course guide:

```text
# Dependencies are installed inside the image (do not copy the laptop's node_modules).
node_modules

# Build output is produced inside the image (Lab 1.2 RUN npm run build).
dist

# VCS metadata is not required in the build context.
.git
.gitignore

Dockerfile

# Documentation and local tooling should not bloat the context.
# terraform/ is authored in Stage 3 and is not part of the React image.
README.md
terraform
CLAIM_ZERO1_Instructions.md
*.md
.oxlintrc.json
```

5. Press **Ctrl + S**.

### Verification

- Confirm `.dockerignore` is saved beside the Dockerfile.  
- **Expected State:** Lean, intentional build context.

### Troubleshooting References

¹ **Symptom:** Very slow builds / huge context.  
  **Resolution:** Confirm `.dockerignore` excludes `node_modules`, `dist`, and docs.

---

## Lab 1.4 — Build the image

### Objective

Build the local image tagged `claim-zero:latest`.

### Command Context

`docker build -t claim-zero:latest .` builds using the Dockerfile in the current directory (`.`) and tags the resulting image `claim-zero:latest`.

### Professional Practice

This workshop uses the `latest` tag for speed. In production teams usually prefer immutable version tags (for example a version number or semver) so deployments are reproducible and rollbacks are explicit. Treat `latest` as convenient for learning — not as a production tagging policy.

### Procedure

1. Confirm the terminal is in the `claim-zero` project root (the folder that contains `Dockerfile` and `package.json`).  
   - If you are inside a subfolder, run `cd ..` to move up one level. Repeat `cd ..` if you still need to go up another level.  
   - If the previous terminal is still running `npm run dev` from Stage 0, click that terminal and press **Ctrl + C** so you can type again.  
2. Build the image. `-t claim-zero:latest` names and tags the result; `.` means the build context is the current folder (Docker uses the `Dockerfile` here):

```bash
docker build -t claim-zero:latest .
```

3. Wait for the build to finish.

### Verification

- Confirm the build completes without error.  
- **Expected State:** Image `claim-zero:latest` exists locally.

### Troubleshooting References

¹ **Symptom:** Build fails on `npm run build`.  
  **Resolution:** Fix the React app build in the starter (`npm run build` locally); then rebuild the image.  
² **Symptom:** Wrong context / missing Dockerfile.  
  **Resolution:** Run from project root; confirm exact filename `Dockerfile`.

---

## Lab 1.5 — Run a local verification container

### Objective

Prove the image serves the landing page before involving AWS.

### Command Context

`docker run -d -p 8080:80 --name claim-zero-container claim-zero:latest` starts a detached container, maps host port **8080** to container port **80**, and names the container for easy stop/remove.

```text
Your browser → http://localhost:8080  →  host port 8080
                                          mapped to
                                       container port 80 (nginx)
```

### Procedure

1. Confirm you are in the project root. If you are inside a subfolder, run `cd ..` to go up one level.  
2. Start a detached verification container. `-d` runs it in the background; `-p 8080:80` maps laptop port 8080 to container port 80; `--name` gives a friendly name for stop/remove later:

```bash
docker run -d -p 8080:80 --name claim-zero-container claim-zero:latest
```

3. Open a browser.  
4. Go to `http://localhost:8080`.

### Verification

- Confirm the Codewrkx landing page loads from the container.  
- **Expected State:** Portability proven on your machine.

### Troubleshooting References

¹ **Symptom:** Port or name conflict.  
  **Resolution:** `docker rm -f claim-zero-container` then re-run Lab 1.5.  
² **Symptom:** Page not loading.  
  **Resolution:** Check `docker ps`; wait a few seconds; retry the URL.

---

## Lab 1.6 — Remove the local test container

### Objective

Stop and remove the verification container while keeping the image for ECR.

### Command Context

`docker stop` gracefully stops the container. `docker rm` removes it. The image `claim-zero:latest` remains available for Stage 2.

### Procedure

1. Stop the running verification container. The image `claim-zero:latest` is kept for Stage 2:

```bash
docker stop claim-zero-container
```

2. Remove the stopped container record. The image is still kept:

```bash
docker rm claim-zero-container
```

### Verification

- Confirm `docker ps -a` no longer lists `claim-zero-container` (or shows it removed).  
- **Expected State:** Test container gone; image retained.

### Troubleshooting References

¹ **Symptom:** Name still in use later.  
  **Resolution:** `docker rm -f claim-zero-container`.

---

### Stage Completion Criteria

Do not continue until all checks pass:

- [ ] `Dockerfile` and `.dockerignore` created by you as new files  
- [ ] `docker build -t claim-zero:latest .` succeeded  
- [ ] Local verification at `http://localhost:8080` succeeded  
- [ ] Test container removed; image retained  

### What We Have Accomplished

You have a production-oriented image validated locally.

### Where We Are Now

**Artefact state:** `claim-zero:latest` on your laptop. AWS does not yet store the image.

### Where We Are Going Next

Stage 2 publishes the image to Amazon ECR. ECS can only pull images that exist in a registry it can reach — not images that live only on your laptop.

### Common Errors & Resolutions (Stage 1)

| # | Error / symptom | Likely cause | Resolution |
|---|-----------------|--------------|------------|
| 1 | `Cannot connect to the Docker daemon` | Docker Desktop is stopped or still starting | Open Docker Desktop → wait until status is **running** → open a **new** terminal → retry |
| 2 | `failed to solve: failed to read dockerfile` / `Dockerfile: no such file` | Wrong folder or wrong filename | `cd` to the project root; if you are in a subfolder, `cd ..` goes up one level; file must be named exactly `Dockerfile` (no `.txt`) |
| 3 | Build fails at `npm run build` | App does not build cleanly outside Docker | From project root run `npm install` then `npm run build`; fix JS/CSS errors; then rebuild the image |
| 4 | Build is extremely slow / huge context | `.dockerignore` missing or incomplete | Confirm `.dockerignore` excludes `node_modules`, `dist`, `*.md`, and `terraform` |
| 5 | `npm ERR!` / lockfile mismatch inside build | Incomplete copy of package files | Ensure `COPY package*.json ./` runs before `npm install`; keep both `package.json` and lockfile if present |
| 6 | Image builds but page is blank at `:8080` | Wrong copy path or empty `dist/` | Confirm Vite outputs to `dist/`; Dockerfile must `COPY --from=builder /app/dist /usr/share/nginx/html` |
| 7 | `Bind for 0.0.0.0:8080 failed: port is already allocated` | Another process or old container uses 8080 | Run `docker rm -f claim-zero-container` or free port 8080; retry `docker run` |
| 8 | `Conflict. The container name "/claim-zero-container" is already in use` | Previous test container still exists | `docker rm -f claim-zero-container` then re-run Lab 1.5 |
| 9 | Browser cannot open `http://localhost:8080` | Container not running or wrong URL | Run `docker ps`; wait a few seconds; use **http** not https; confirm mapping `-p 8080:80` |
| 10 | `docker: command not found` | Docker CLI not on PATH / Desktop not installed | Install/start Docker Desktop; reboot or open a new terminal; verify with `docker --version` |

### Stage Summary

Stage 1 solved runtime portability locally. The next problem is cloud visibility of that artefact. Stage 2 stores the packaged meal in the distribution centre.

---

# STAGE 2 — Container Image Publishing

### Stage Overview

Stage 2 authenticates to AWS, creates an ECR repository, and pushes `claim-zero:latest` so ECS can pull it later.

### Where We Came From

Stage 1 produced a locally verified image. That image is invisible to AWS compute until it lives in a registry.

### Where We Are Now

You will create a workshop IAM user, configure the AWS CLI, create the ECR repository, log Docker into ECR, and push the image.

### Where We Are Going

An image in ECR unblocks Stage 3: Terraform can declare an ECS task that references the ECR URI.

### Restaurant Context

Your packaged meal is still on the kitchen counter. Amazon ECR is the distribution and storage centre. Until the package sits on the labelled shelf (`claim-zero:latest`), the operational kitchen (ECS) cannot stock the service counter.

### Technical Context

Amazon Elastic Container Registry (ECR) is a managed container image registry. Think of it as a private “app store shelf” for container images inside your AWS account.

ECS task definitions reference an image URI shaped like:

```text
ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/claim-zero:latest
│          │                │              │          │
│          │                │              │          └─ tag (which version)
│          │                │              └─ repository name
│          │                └─ region
│          └─ Elastic Container Registry host
└─ your 12-digit AWS account ID
```

The dependency is strict: **ECS → needs ECR → needs Docker image → needs application build**. Skipping ECR and pointing ECS at a laptop image is not how this architecture works.

### Workshop vs Production — IAM

**Workshop Implementation:** attach **AdministratorAccess** and **PowerUserAccess** to a dedicated IAM user so permission gaps do not block learning during the live session.

**Production Practice:** use the principle of **least privilege** — narrow policies for ECR, ECS, and Terraform-scoped actions. Never use root for daily work, and rarely use broad AdministratorAccess for routine delivery.

### Why This Stage Matters

Without the image in ECR, `terraform apply` can create infrastructure that fails to start tasks. Publishing is the bridge from local packaging to cloud runtime.

### What We Will Produce

IAM CLI credentials, an ECR repository `claim-zero`, and tag `latest` present in ECR in `us-east-1`.

### Architecture Snapshot

```text
Starter project → Docker → Image (claim-zero:latest)
                                              │
                                              ▼
                                    Amazon ECR (claim-zero:latest)
```

### SOFTWARE DELIVERY PROGRESS: ✓ Starter ready → ✓ 0 Smoke check → ✓ 1 Package → ► 2 Publish → □ 3 Provision → □ 4 Prove → □ 5 Pipeline

### Learning Outcomes

- Create a dedicated IAM user for CLI work  
- Configure AWS CLI and verify identity  
- Authenticate Docker to ECR and push an image  
- Confirm the published tag in the console  

### Key Terminology

| Term | Meaning |
|------|---------|
| IAM | Identity and Access Management — users, roles, policies |
| Access key | Long-lived CLI credentials (treat like a password) |
| ECR | Elastic Container Registry |
| Image URI | Full registry address including account, region, repo, tag |
| Least privilege | Grant only the permissions required for a task |

---

## Lab 2.1 — Create an IAM user (Administrator + Power User)

### Objective

Create IAM user `claim-zero-participant` with workshop policies and download an access key CSV.

### Workshop vs Production

Workshop: AdministratorAccess + PowerUserAccess to reduce permission blockers.  
Production: scoped policies; no root for daily work; rotate and protect keys.

### Why this lab exists

The AWS root user is for account recovery and rare admin tasks — not for everyday CLI work. You create a dedicated IAM user so the AWS CLI and Terraform can act with clear identity, and so you can revoke keys later without touching the root password.

### Procedure

1. Open the AWS Console in **`us-east-1`**.  
2. Search for **IAM** and open it.  
3. Click **Users**.  
4. Click **Create user**.  
5. Enter user name `claim-zero-participant`.  
6. Click **Next**.  
7. Choose **Attach policies directly**.  
8. Search for and select **AdministratorAccess**.  
9. Search for and select **PowerUserAccess**.  
10. Click **Next**.  
11. Click **Create user**.  
12. Open the new user.  
13. Open the **Security credentials** tab.  
14. Under **Access keys**, click **Create access key**.  
15. Select **Command Line Interface (CLI)**.  
16. Confirm the checkbox.  
17. Click **Next**, then **Create access key**.  
18. Download the `.csv` file and store it privately.

### Verification

- Confirm the user exists with both policies and you have a private access key CSV.  
- **Expected State:** CLI credentials available; never save them in project files or share them.

### Troubleshooting References

¹ **Symptom:** Lost secret access key.  
  **Resolution:** Create a new access key; disable/delete the old one.

---

## Lab 2.2 — Configure the AWS CLI

### Objective

Persist access keys, region `us-east-1`, and output `json`, then verify identity.

### Command Context

`aws configure` writes credentials and defaults used by subsequent AWS CLI and Terraform AWS provider calls. Those values typically land in your user profile (for example `%USERPROFILE%\.aws\credentials` and `config` on Windows).

`aws sts get-caller-identity` returns Account, UserId, and Arn — proof AWS recognises you. STS is the “who am I?” service for AWS API callers.

### Procedure

1. In VS Code terminal, run the interactive setup. This stores Access Key, Secret Key, default region, and output format for all later `aws ...` and Terraform AWS provider calls. If a previous command (such as `npm run dev`) is still occupying the terminal, press **Ctrl + C** first:

```bash
aws configure
```

2. Enter **AWS Access Key ID** → **Enter**.  
3. Enter **AWS Secret Access Key** → **Enter**.  
4. Enter default region `us-east-1` → **Enter**.  
5. Enter output format `json` → **Enter**.  
6. Confirm AWS recognises you. This asks AWS which identity is calling and must return Account, UserId, and Arn:

```bash
aws sts get-caller-identity
```

### Verification

- Confirm identity JSON returns Account, UserId, and Arn.  
- **Expected State:** CLI authenticated for ECR and Terraform.

### Troubleshooting References

¹ **Symptom:** Invalid client token / signature errors.  
  **Resolution:** Create a new access key; re-run `aws configure` carefully.  
² **Symptom:** Wrong region behaviour later.  
  **Resolution:** Re-run `aws configure` and set `us-east-1`.

---

## Lab 2.3 — Create the ECR repository

### Objective

Create the ECR repository named `claim-zero` in `us-east-1`.

### Command Context

`aws ecr create-repository --repository-name claim-zero --region us-east-1` creates the named registry repository if it does not already exist.

A repository is the named shelf. Tags (like `latest`) are the specific packages on that shelf.

### Procedure

1. Create the private ECR repository named `claim-zero` in `us-east-1`. If it already exists, continue to the next lab:

```bash
aws ecr create-repository --repository-name claim-zero --region us-east-1
```

### Verification

- Confirm the command succeeds (or reports the repository already exists).  
- **Expected State:** ECR repository ready for push.

### Troubleshooting References

¹ **Symptom:** Repository already exists.  
  **Resolution:** Continue to Lab 2.4 — that is fine.

---

## Lab 2.4 — Resolve account ID

### Objective

Capture your 12-digit AWS account ID for ECR login, tag, and push commands.

### Command Context

`aws sts get-caller-identity --query Account --output text` prints only the account ID.

Every ECR hostname includes your account ID. Copying it once prevents typos in the next labs.

### Procedure

1. Print only the 12-digit account ID (no extra JSON). You will substitute this value wherever you see `ACCOUNT_ID`:

```bash
aws sts get-caller-identity --query Account --output text
```

2. Copy the printed account ID.  
3. In the next labs, replace `ACCOUNT_ID` with that value.

### Verification

- Confirm you have a 12-digit account ID copied.  
- **Expected State:** Ready for login/tag/push substitutions.

### Troubleshooting References

¹ **Symptom:** Empty or unexpected output.  
  **Resolution:** Revisit Lab 2.2 identity; retry the query.

---

## Lab 2.5 — Authenticate Docker to ECR

### Objective

Log Docker into your private ECR registry using a short-lived password.

### Command Context

`aws ecr get-login-password` retrieves a temporary token. Piping it into `docker login ... --password-stdin` authenticates the Docker client to ECR without printing the password in the process list unnecessarily.

This is not your IAM access key. It is a short-lived ECR password that Docker uses for push/pull.

### Procedure

1. Log Docker into your ECR registry (replace `ACCOUNT_ID` with the 12-digit value from Lab 2.4). This asks AWS for a temporary ECR password and pipes it into Docker login for your registry hostname:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

### Verification

- Confirm the terminal reports `Login Succeeded`.  
- **Expected State:** Docker authorised to push to your ECR registry.

### Troubleshooting References

¹ **Symptom:** Login failed / expired token.  
  **Resolution:** Ensure Docker Desktop is running; re-run the login command.

---

## Lab 2.6 — Tag and push the image

### Objective

Tag the local image with the ECR URI and push `latest`.

### Command Context

`docker tag` creates an additional name pointing at the same image layers. It does not rebuild the app — it only adds an alias Docker understands for the remote registry.

`docker push` uploads layers to ECR.

### Professional Practice

Again, `latest` is workshop-friendly. Production pipelines typically push immutable tags and deploy by digest or version tag so rollbacks are deterministic.

### Procedure

1. Give the local image an ECR-compatible name (same layers, new alias). Replace `ACCOUNT_ID`. Local name: `claim-zero:latest`. Remote name: `ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/claim-zero:latest`:

```bash
docker tag claim-zero:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/claim-zero:latest
```

2. Upload the image layers to your private ECR repository:

```bash
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/claim-zero:latest
```

3. Wait until the push completes.

### Verification

- Confirm the push finishes without error.  
- **Expected State:** `claim-zero:latest` stored in ECR.

### Troubleshooting References

¹ **Symptom:** `name unknown` on push.  
  **Resolution:** Check account ID, repository name `claim-zero`, and region `us-east-1`.

---

## Lab 2.7 — Confirm in the AWS Console

### Objective

Verify tag `latest` is visible in the ECR console.

### Why this lab exists

CLI success is strong evidence — the console confirmation trains the habit of verifying the same artefact in the UI that operators use during incidents.

### Procedure

1. In the AWS Console, open **Elastic Container Registry**.  
2. Confirm Region is **us-east-1**.  
3. Click **Repositories**.  
4. Click **claim-zero**.  
5. Confirm tag **latest** is listed.

### Verification

- Confirm console and CLI agree the image is present.  
- **Expected State:** Image available for ECS to pull.

### Troubleshooting References

¹ **Symptom:** Image not visible.  
  **Resolution:** Switch console Region to **us-east-1**; refresh.

---

### Stage Completion Criteria

Do not continue until all checks pass:

- [ ] `aws sts get-caller-identity` succeeds  
- [ ] ECR repository `claim-zero` exists  
- [ ] Tag `latest` exists in ECR in `us-east-1`  

### What We Have Accomplished

Your portable artefact now lives in AWS where ECS can reach it.

### Where We Are Now

**Artefact state:** Image in ECR. No ECS cluster or public endpoint yet.

### Where We Are Going Next

Stage 3 provisions the facilities and operational kitchen with Terraform: security group, IAM roles, one `t3.micro` EC2 host, ECS cluster, task definition, and service. Console-only creation is intentionally avoided so destroy stays consistent.

### Common Errors & Resolutions (Stage 2)

| # | Error / symptom | Likely cause | Resolution |
|---|-----------------|--------------|------------|
| 1 | `Unable to locate credentials` / `ExpiredToken` | `aws configure` not done or wrong keys | Re-run Lab 2.2 carefully; paste Access Key ID and Secret Access Key with no spaces |
| 2 | `InvalidClientTokenId` / `SignatureDoesNotMatch` | Typo in secret key or deactivated key | Create a **new** access key on the IAM user; disable the old one; re-run `aws configure` |
| 3 | `AccessDeniedException` on ECR create/push | IAM user missing policies | Confirm `claim-zero-participant` has **AdministratorAccess** and **PowerUserAccess**; wait ~1 minute; retry |
| 4 | Wrong Region (repo “missing” in console) | Console or CLI not on `us-east-1` | Set console Region to **N. Virginia**; re-run `aws configure` with `us-east-1` |
| 5 | `RepositoryAlreadyExistsException` | Repo already created earlier | Continue — this is fine; proceed to login/tag/push |
| 6 | `Error response from daemon: login attempt ... failed` | Docker Desktop stopped or bad account ID | Start Docker Desktop; re-check 12-digit `ACCOUNT_ID`; re-run the `get-login-password \| docker login` command |
| 7 | `name unknown: The repository with name 'claim-zero' does not exist` | Push before create, or typo in repo/URI | Run Lab 2.3 create-repository; confirm URI uses `/claim-zero:latest` and `us-east-1` |
| 8 | `denied: User ... is not authorized to perform ...` | Wrong IAM identity / MFA session issues | Run `aws sts get-caller-identity`; confirm Arn is the workshop user; recreate access key if needed |
| 9 | Push hangs or times out | Network / VPN / proxy interference | Retry on a stable network; temporarily disable VPN if allowed; confirm Docker engine is running |
| 10 | Tag `latest` not visible in console | Looking at wrong Region/repo, or push incomplete | Wait for push to finish; open ECR → Repositories → `claim-zero` in **us-east-1**; refresh |

### Stage Summary

Stage 2 solved “AWS cannot see my image.” The next problem is “there is no infrastructure to run it.” Stage 3 builds that infrastructure as code.

---

# STAGE 3 — Infrastructure Provisioning

### Stage Overview

Stage 3 declares Free Tier–aligned AWS infrastructure as code and applies it with Terraform.

### Where We Came From

Stage 2 placed `claim-zero:latest` in ECR. Compute and orchestration do not exist yet.

### Where We Are Now

You will create `terraform/main.tf` from scratch, initialise Terraform, review the plan, and apply the stack in `us-east-1`.

### Where We Are Going

Applied infrastructure gives Stage 4 a cluster, service, and public IP to validate in the browser.

### Restaurant Context

Terraform is the construction blueprint for a temporary restaurant: doors (security group), power and permissions (IAM), the building shell (EC2), and the operational kitchen layout (ECS cluster, task, service). You do not furnish by memory in the console — you apply the blueprint so you can later close the restaurant cleanly.

### Technical Context

This course’s stack uses the **default VPC**, one **t3.micro** ECS-optimised EC2 instance with a public IP, an ECS cluster and service (launch type **EC2**, not Fargate), bridge networking mapping host port 80 to container port 80, IAM roles for the ECS agent and task execution (ECR pull + CloudWatch logs), and a short-retention CloudWatch log group.

**Intentionally omitted:** Application Load Balancer, Fargate, NAT Gateway — they add cost and complexity that obscure the learning path.

**Hard prerequisite:** the Stage 2 image must already exist in ECR. The task definition references that URI.

### Why Terraform (not Console-only)?

Clicking resources by hand creates snowflake environments that are hard to reproduce and easy to forget when tearing down. Terraform records desired state in `main.tf`, shows a plan before changes, and supports `destroy` of the same graph. That is professional infrastructure practice for this course’s scope.

### Process map — what happens when you apply

```text
main.tf (desired state)
    │
    ▼
terraform init      → download AWS provider plugin
terraform validate  → check syntax / consistency
terraform plan      → preview create/change/destroy
terraform apply     → create real AWS resources + write state
    │
    ▼
Outputs (app_url, IPs, cluster name)
```

### Why This Stage Matters

Without provisioned compute and ECS wiring, the image in ECR never becomes a running service.

### What We Will Build

A Terraform-managed stack: security group, IAM roles/profile, EC2 instance, ECS cluster, task definition, service, and outputs including `app_url`.

### Architecture Snapshot

```text
Starter project → Docker → Image → ECR
                                   │
         Terraform (main.tf) ──────┤
                                   ▼
         AWS infra (SG, IAM, EC2, ECS cluster/service)
```

### SOFTWARE DELIVERY PROGRESS: ✓ Starter ready → ✓ 0 Smoke check → ✓ 1 Package → ✓ 2 Publish → ► 3 Provision → □ 4 Prove → □ 5 Pipeline

### Learning Outcomes

- Author `terraform/main.tf` from this course guide  
- Run `init`, `validate`, `plan`, and `apply`  
- Identify Free Tier shape (`t3.micro`, ECS on EC2, no ALB)  
- Capture Terraform outputs for validation  

### Key Terminology

| Term | Meaning |
|------|---------|
| Terraform | Tool for declaring and applying infrastructure as code |
| Provider | Plugin that talks to an API (here: AWS) |
| Plan | Preview of create/change/destroy actions |
| Apply | Execute the planned changes |
| State | Terraform’s record of managed resources |
| Task definition | ECS document describing container image, ports, resources |

---

## Lab 3.1 — Create `terraform/main.tf`

### Objective

Create the `terraform` folder and `main.tf` from scratch; paste the full Free Tier configuration from this course guide.

### Why Are We Doing It This Way?

You author the blueprint in your project so destroy targets the same definition you applied. Do not copy a finished `terraform` folder from someone else’s machine — create the folder and file yourself, then paste.

### Procedure

1. Right-click the project root.  
2. Click **New Folder**.  
3. Name it `terraform`.  
4. Right-click `terraform`.  
5. Click **New File**.  
6. Name it `main.tf`.  
7. Open `terraform/main.tf`.  
8. Paste the full configuration below from this course guide.  
9. Press **Ctrl + S**.

```hcl
# =============================================================================
# CLAIM ZERO — Free Tier ECS on EC2
# Region: us-east-1
# No ALB / Fargate in this edition. Destroy at session end.
# Paste this entire file into terraform/main.tf (Lab 3.1). Do not split it.
# =============================================================================

# Terraform settings: minimum Terraform version + AWS provider pin.
# "~> 5.0" means "any 5.x" — avoids accidental jumps to a new major provider.
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Every resource below is created in this region (must match ECR: us-east-1).
provider "aws" {
  region = "us-east-1"
}

# Look up the account currently authenticated via the AWS CLI / credentials.
# Used to build the ECR image URI without hard-coding your account ID.
data "aws_caller_identity" "current" {}

# Reuse the account's default VPC — no custom networking cost for this lab.
data "aws_vpc" "default" {
  default = true
}

# Discover subnets that belong to that default VPC.
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# AWS publishes the recommended ECS-optimised AMI ID in SSM Parameter Store.
# This keeps the lab on a current Amazon Linux 2 ECS AMI without hard-coding.
data "aws_ssm_parameter" "ecs_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

locals {
  project    = "claim-zero"
  account_id = data.aws_caller_identity.current.account_id
  region     = "us-east-1"
  # Must already exist in ECR from Stage 2 of this course.
  # Shape: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/claim-zero:latest
  image_uri  = "${local.account_id}.dkr.ecr.${local.region}.amazonaws.com/${local.project}:latest"
  # Pick the first default subnet for the single EC2 host.
  subnet_id  = element(data.aws_subnets.default.ids, 0)
}

# -----------------------------------------------------------------------------
# Networking — allow inbound HTTP (port 80) from the internet to the EC2 host.
# -----------------------------------------------------------------------------
resource "aws_security_group" "ecs" {
  name        = "${local.project}-sg"
  description = "Allow HTTP for CLAIM ZERO Free Tier lab"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Workshop: open HTTP. Tighten in production.
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"          # All outbound (needed for ECR pulls, logs, etc.)
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "${local.project}-sg"
    Project = local.project
  }
}

# Logical grouping for ECS services/tasks.
resource "aws_ecs_cluster" "claim" {
  name = "${local.project}-cluster"

  tags = {
    Name    = "${local.project}-cluster"
    Project = local.project
  }
}

# -----------------------------------------------------------------------------
# IAM — EC2 instance role so the ECS agent can register with the cluster.
# -----------------------------------------------------------------------------
resource "aws_iam_role" "ecs_instance" {
  name = "${local.project}-ecs-instance-role"

  # Trust policy: only the EC2 service may assume this role.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_instance" {
  role       = aws_iam_role.ecs_instance.name
  # AWS managed policy that grants ECS agent permissions on the instance.
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

# Instance profiles are how EC2 instances receive an IAM role.
resource "aws_iam_instance_profile" "ecs" {
  name = "${local.project}-ecs-instance-profile"
  role = aws_iam_role.ecs_instance.name
}

# -----------------------------------------------------------------------------
# IAM — task execution role so ECS can pull from ECR and write CloudWatch logs.
# -----------------------------------------------------------------------------
resource "aws_iam_role" "ecs_execution" {
  name = "${local.project}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Short retention keeps log cost tiny for a workshop.
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${local.project}"
  retention_in_days = 3

  tags = {
    Project = local.project
  }
}

# -----------------------------------------------------------------------------
# Compute — one Free Tier–eligible EC2 host joined to the ECS cluster.
# -----------------------------------------------------------------------------
resource "aws_instance" "ecs" {
  ami                         = data.aws_ssm_parameter.ecs_ami.value
  instance_type               = "t3.micro"
  subnet_id                   = local.subnet_id
  vpc_security_group_ids      = [aws_security_group.ecs.id]
  iam_instance_profile        = aws_iam_instance_profile.ecs.name
  # Needed so you can browse http://PUBLIC_IP in Stage 4.
  associate_public_ip_address = true

  # On first boot, tell the ECS agent which cluster to join.
  user_data = base64encode(<<-EOT
    #!/bin/bash
    echo ECS_CLUSTER=${aws_ecs_cluster.claim.name} >> /etc/ecs/ecs.config
  EOT
  )

  tags = {
    Name    = "${local.project}-ecs-instance"
    Project = local.project
  }
}

# -----------------------------------------------------------------------------
# ECS task definition — "what container to run" (image, ports, logs, size).
# -----------------------------------------------------------------------------
resource "aws_ecs_task_definition" "app" {
  family                   = local.project
  requires_compatibilities = ["EC2"]   # Not Fargate in this course
  network_mode             = "bridge"  # Classic Docker bridge on the EC2 host
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = local.project
      image     = local.image_uri # ECR URI from Stage 2
      essential = true
      portMappings = [
        {
          containerPort = 80 # nginx inside the container
          hostPort      = 80 # exposed on the EC2 public IP
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = local.region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

# -----------------------------------------------------------------------------
# ECS service — keep desired_count tasks running on the cluster.
# -----------------------------------------------------------------------------
resource "aws_ecs_service" "app" {
  name            = "${local.project}-service"
  cluster         = aws_ecs_cluster.claim.id
  task_definition = aws_ecs_task_definition.app.arn
  # Keep exactly one task running (enough for this lab).
  desired_count   = 1
  launch_type     = "EC2"

  # Wait for the EC2 instance resource to exist before creating the service.
  depends_on = [aws_instance.ecs]
}

# -----------------------------------------------------------------------------
# Outputs — values you need for Stage 4 browser validation.
# -----------------------------------------------------------------------------
output "app_url" {
  description = "Browser URL once the ECS task is RUNNING"
  value       = "http://${aws_instance.ecs.public_ip}"
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.claim.name
}

output "ecr_image_uri" {
  value = local.image_uri
}

output "instance_public_ip" {
  value = aws_instance.ecs.public_ip
}
```

### Verification

- Confirm `terraform/main.tf` exists with the full stack definition.  
- **Expected State:** Blueprint on disk; nothing applied yet.

### Troubleshooting References

¹ **Symptom:** Syntax errors on validate later.  
  **Resolution:** Clear the file and re-paste the full `main.tf` from this course guide.

---

## Lab 3.2 — Initialise and validate

### Objective

Download providers and confirm the configuration is syntactically valid.

### Command Context

`terraform init` initialises the working directory and downloads the AWS provider.  
`terraform validate` checks configuration syntax and internal consistency without changing cloud resources.

This is the “compile check” before you spend money or create anything.

### Procedure

1. Enter the folder that contains `main.tf`. You are moving one level into the project. If you later need to return to the project root, run `cd ..`. If a previous command is still occupying the terminal, press **Ctrl + C** first:

```bash
cd terraform
```

2. Download the HashiCorp AWS provider plugin into `.terraform/`:

```bash
terraform init
```

3. Check that `main.tf` is grammatically valid. This does not create resources yet:

```bash
terraform validate
```

### Verification

- Confirm init succeeds and validate reports success.  
- **Expected State:** Tool-ready, grammatically sound blueprint.

### Troubleshooting References

¹ **Symptom:** Terraform not found.  
  **Resolution:** Confirm Terraform is installed and on PATH; open a new terminal.  
² **Symptom:** Wrong directory.  
  **Resolution:** `cd` to the folder containing `main.tf`. If you went too far into a subfolder, run `cd ..` to go up one level.

---

## Lab 3.3 — Review the execution plan

### Objective

Inspect what Terraform intends to create before you spend cloud resources.

### Command Context

`terraform plan` shows the execution plan: resources to add, change, or destroy. Review it before `apply`.

Reading the plan is professional discipline: you approve intent before AWS receives create calls.

### Procedure

1. Stay in the `terraform` folder (if you are in the project root, run `cd terraform`; if you went too deep, run `cd ..`). Preview every resource Terraform wants to create, change, or destroy:

```bash
terraform plan
```

2. Confirm the plan includes `t3.micro` and ECS on EC2.  
3. Confirm the plan does **not** include an Application Load Balancer.

### Verification

- Confirm you understand the change set and Free Tier shape.  
- **Expected State:** Ready to apply with eyes open.

### Troubleshooting References

¹ **Symptom:** Plan shows an ALB or unexpected resources.  
  **Resolution:** Replace `main.tf` with this course guide’s configuration and re-plan.

---

## Lab 3.4 — Apply the configuration

### Objective

Create the declared infrastructure in AWS and capture outputs.

### Command Context

`terraform apply` proposes the plan and, after you type `yes`, creates resources.  
`terraform output` prints output values such as `app_url`.

ECS may need a few minutes after apply before a task shows as RUNNING — that wait is normal (instance boot + agent register + image pull).

### Procedure

1. Stay in the `terraform` folder. Create the real AWS resources declared in `main.tf`. This command waits for you to type `yes`; it is not a long-running server, so you do not need **Ctrl + C** unless you want to cancel before confirming:

```bash
terraform apply
```

2. When prompted, type `yes` and press **Enter**.  
3. Wait for `Apply complete!`.  
4. Print outputs and copy `app_url` for Stage 4:

```bash
terraform output
```

5. Copy `app_url`.

### Verification

- Confirm apply completed and `app_url` is available.  
- **Expected State:** Infrastructure exists; Stage 4 will wait for the running task.

### Troubleshooting References

¹ **Symptom:** Credential errors.  
  **Resolution:** Complete Lab 2.2; retry.  
² **Symptom:** UnauthorizedOperation.  
  **Resolution:** Confirm AdministratorAccess + PowerUserAccess on the IAM user.  
³ **Symptom:** Default VPC missing.  
  **Resolution:** Create the default VPC in `us-east-1` (VPC console action), then re-apply.

---

### Stage Completion Criteria

Do not continue until all checks pass:

- [ ] `terraform/main.tf` created by you (New Folder + New File)  
- [ ] `terraform apply` completed  
- [ ] `app_url` available from `terraform output`  

### What We Have Accomplished

You provisioned the facilities and operational kitchen as code.

### Where We Are Now

**Artefact state:** ECS stack applied; public IP allocated. Task may still be starting. Site not yet verified in a browser.

### Where We Are Going Next

Stage 4 validates the live endpoint: confirm the ECS task is running, open `http://PUBLIC_IP`, and optionally practise an update cycle. Delivery is incomplete until the service is observable.

### Common Errors & Resolutions (Stage 3)

| # | Error / symptom | Likely cause | Resolution |
|---|-----------------|--------------|------------|
| 1 | `terraform: command not found` | Terraform not installed or PATH stale | Install Terraform 1.15.x; open a **new** terminal; verify with `terraform version` |
| 2 | `No configuration files` / wrong directory | Not inside `terraform/` | `cd terraform` so `main.tf` is in the current folder. If you are too deep, `cd ..` goes up one level |
| 3 | `Error: Invalid character` / HCL parse error | Incomplete paste of `main.tf` | Clear `main.tf` and re-paste the full block from Lab 3.1; save; re-validate |
| 4 | `Error: No valid credential sources found` | AWS CLI credentials missing for Terraform | Complete Lab 2.2; confirm `aws sts get-caller-identity` works; retry `terraform plan` |
| 5 | `UnauthorizedOperation` / `AccessDenied` on apply | IAM user lacks permissions | Attach AdministratorAccess + PowerUserAccess; wait; retry `terraform apply` |
| 6 | `Error creating VPC` / default VPC missing | Account has no default VPC in `us-east-1` | VPC console → create default VPC in **us-east-1** → re-apply |
| 7 | Plan unexpectedly shows ALB / Fargate | Wrong `main.tf` content | Replace with this course’s Free Tier EC2+ECS config; re-run `terraform plan` |
| 8 | `Error: creating EC2 Instance: Unsupported` / AMI issue | Bad AMI lookup / instance type | Confirm `t3.micro` and the ECS-optimised AMI data source; Region must be `us-east-1` |
| 9 | Apply fails on IAM role name conflict | Role/profile names already exist from a prior run | Import, rename, or destroy leftover resources; prefer a clean destroy of old workshop stacks first |
| 10 | Apply succeeds but no `app_url` | Forgot `terraform output` or apply incomplete | Re-run `terraform output`; if empty, re-check apply logs and state |

### Stage Summary

Stage 3 solved “no infrastructure to run the image.” The next problem is proving the service works for a customer (browser) — Stage 4.

---

# STAGE 4 — Application Deployment and Validation

### Stage Overview

Stage 4 confirms ECS is running your container and that the public endpoint serves your React landing page. An optional update cycle rehearses a release-style refresh.

### Where We Came From

Stage 3 applied Terraform. Infrastructure exists; customer-visible proof may not yet.

### Where We Are Now

You will wait for one running ECS task, open the Terraform `app_url` over HTTP, and optionally rebuild/push/force a new deployment.

### Where We Are Going

After the browser proof, keep the service running. Stage 5 connects GitHub so a push rebuilds and redeploys the **same** ECS service. Destroy only after Stage 5.

### Restaurant Context

The operational kitchen should now be plating meals to the service counter. CloudWatch is the operational monitoring channel for container logs. You verify as the customer in the browser — then Stage 5 automates the next plate instead of you cooking it by hand.

### Technical Context

ECS desired count is 1. The task runs on the EC2 instance with host port 80 mapped to nginx in the container. The security group allows inbound TCP 80. Use **`http://`** (not https) for this lab design — there is no TLS certificate or load balancer in scope.

If a task stays at zero running, inspect stopped-task reasons and confirm the ECR image URI and IAM execution role permissions. Optional Lab 4.3 demonstrates: change source → rebuild image → push ECR → `force-new-deployment` without redesigning infrastructure.

### Why This Stage Matters

Provisioning without verification is unfinished delivery. You need evidence the browser receives your page before you automate the next release.

### What We Will Produce

Evidence of a healthy ECS service and a live public URL. Optionally, a refreshed deployment after a code change.

### Architecture Snapshot

```text
Starter project → Docker → Image → ECR
                                    │
            Terraform → AWS infra → ECS → Running container
                                            │
                                            ▼
                                  Public endpoint (http://IP)
                                            │
                                            ▼
                                         Browser
```

### SOFTWARE DELIVERY PROGRESS: ✓ Starter ready → ✓ 0 Smoke check → ✓ 1 Package → ✓ 2 Publish → ✓ 3 Provision → ► 4 Prove → □ 5 Pipeline

### Learning Outcomes

- Confirm ECS service health and EC2 launch type  
- Open and validate the public application URL  
- Optionally perform a rebuild → push → redeploy cycle  

### Key Terminology

| Term | Meaning |
|------|---------|
| Desired count | How many tasks ECS should keep running |
| Running task | A task successfully placed and running |
| Force new deployment | Ask ECS to start new tasks with the current task definition / image pull |
| Public IP | Internet-reachable address of the EC2 host in this design |

---

## Lab 4.1 — Confirm ECS service health

### Objective

Wait until ECS reports one running task on launch type EC2.

### Why this lab exists

Terraform “Apply complete” means resources exist. It does **not** always mean the container is already serving traffic. You wait for the orchestrator to place and start the task.

### Procedure

1. Open **Amazon ECS** in the console.  
2. Click **Clusters**.  
3. Open `claim-zero-cluster`.  
4. Open **Services**.  
5. Open `claim-zero-service`.  
6. Wait until **Running tasks = 1**.  
7. Confirm launch type is **EC2**.

### Verification

- Confirm **Running tasks = 1** and launch type **EC2**.  
- **Expected State:** Compute is serving your container.

### Troubleshooting References

¹ **Symptom:** Running count stays 0.  
  **Resolution:** Wait 2–5 minutes; check stopped task reason; confirm ECR image `latest` exists; confirm execution role can pull from ECR.

---

## Lab 4.2 — Open the application URL

### Objective

Open the Terraform output URL over HTTP and confirm the landing page loads.

### Command Context

`terraform output app_url` prints `http://PUBLIC_IP` for the EC2 instance. Use HTTP only in this workshop design.

### Procedure

1. In the terminal, ensure you are in the `terraform` folder.  
   - If you are in the project root, run `cd terraform`.  
   - If you are inside a deeper folder, run `cd ..` to go up one level until you are in `terraform`.  
2. Print `http://PUBLIC_IP`. Use exactly this scheme (`http`, not `https`):

```bash
terraform output app_url
```

3. Copy the URL.  
4. Open a new browser tab.  
5. Paste the URL.  
6. Press **Enter**.

### Verification

- Confirm the Codewrkx landing page loads at the public IP using `http://`.  
- **Expected State:** Live deployment validated in a browser.

### Troubleshooting References

¹ **Symptom:** Browser timeout.  
  **Resolution:** Wait until Lab 4.1 shows Running=1; use `http://` not `https://`; re-check `app_url`.  
² **Symptom:** HTTPS / certificate errors.  
  **Resolution:** Use `http://` only for this lab.

---

## Lab 4.3 — Optional update cycle

### Objective

If time allows, change application text, rebuild and push the image, and force a new ECS deployment.

### Command Context

`aws ecs update-service ... --force-new-deployment` asks the service to deploy new tasks, which re-pull the image referenced by the task definition (here: ECR `latest`).

### Professional Practice

This is a simplified **manual** release loop. Production teams combine immutable image tags, controlled rollouts, and health checks. Here you learn the shape: new artefact → registry → orchestrator refresh. Stage 5 runs this same loop from GitHub so you do not rebuild on the laptop.

### Procedure

1. Edit text in `src/App.jsx` and save.  
2. Return to the **project root** (the folder that contains `Dockerfile`). If your terminal is still inside the `terraform` folder from Stage 3, go up one level:

```bash
cd ..
```

If you are still not at the project root, run `cd ..` again. If `npm run dev` is occupying the terminal, press **Ctrl + C** first.  
3. Rebuild the local image from the Dockerfile you created in Stage 1:

```bash
docker build -t claim-zero:latest .
```

4. Tag and push to ECR again (same commands as Labs 2.5–2.6).  
5. Tell ECS to start a new deployment and re-pull the image tagged `latest`:

```bash
aws ecs update-service --cluster claim-zero-cluster --service claim-zero-service --force-new-deployment --region us-east-1
```

6. Wait for the new task to become running.  
7. Refresh the public URL.

### Verification

- Confirm the updated text appears after refresh (hard refresh if needed).  
- **Expected State:** Artefact refreshed without redesigning infrastructure.

### Troubleshooting References

¹ **Symptom:** No visible update.  
  **Resolution:** Hard refresh the browser; wait for the new deployment to stabilise; confirm push to ECR succeeded.

---

### Stage Completion Criteria

Do not continue until all checks pass:

- [ ] ECS service shows Running tasks = 1 (EC2)  
- [ ] Application verified via public IP over `http://`  
- [ ] (Optional) Update cycle completed if time allowed  
- [ ] **Do not** run `terraform destroy` yet — Stage 5 needs this live service  

### What We Have Accomplished

You validated a live cloud deployment — packaged with Docker, published to ECR, provisioned with Terraform, and proven in a browser.

### Where We Are Now

**Artefact state:** Service reachable at public IP. Billable compute is running. Stage 2 was “I pushed the image.” Stage 5 is “GitHub pushes the image.”

### Where We Are Going Next

Stage 5 adds one Free Tier pipeline on **this same** `t3.micro` service. Same Dockerfile, same ECR repo, same cluster. Destroy happens in Lab 5.6.

### Common Errors & Resolutions (Stage 4)

| # | Error / symptom | Likely cause | Resolution |
|---|-----------------|--------------|------------|
| 1 | ECS **Running tasks = 0** for several minutes | Instance still registering or image pull delayed | Wait 2–5 minutes; refresh the service; check EC2 instance is **running** |
| 2 | Tasks start then immediately stop | Cannot pull image / bad image URI / IAM | Open stopped-task reason; confirm ECR `claim-zero:latest` in `us-east-1`; confirm execution role can pull |
| 3 | `CannotPullContainerError` | ECR auth/permissions or wrong URI | Verify Stage 2 push; confirm task definition image URI matches your account/region/repo |
| 4 | Browser timeout to public IP | Task not running yet, or security group blocks 80 | Confirm Running=1; SG allows inbound TCP 80 from `0.0.0.0/0`; retry |
| 5 | `https://` certificate / privacy errors | Using HTTPS on an HTTP-only lab | Use **`http://PUBLIC_IP`** exactly (no TLS / no ALB in this design) |
| 6 | `terraform output app_url` empty / error | Wrong directory or state missing | `cd terraform` where state exists (use `cd ..` if you are too deep); re-run `terraform output`; confirm apply completed |
| 7 | Page loads but looks wrong / old content | Browser cache or old container still serving | Hard refresh (Ctrl+F5); wait for new task; confirm optional push completed |
| 8 | Optional update: force-new-deployment succeeds but UI unchanged | Forgot rebuild/push of `latest` | Rebuild → tag → push to ECR → then `force-new-deployment`; wait for new task |
| 9 | Wrong cluster/service name in console | Typo or looking in wrong Region | Open **us-east-1** → cluster `claim-zero-cluster` → service `claim-zero-service` |

### Stage Summary

Stage 4 solved “is it really live?” The next problem is repeating Lab 4.3 by hand every time the app changes — Stage 5 automates that from GitHub.

---

# STAGE 5 — GitHub CI/CD (automated build and deploy)

### Stage Overview

Stage 5 connects GitHub to AWS so a push to `main` builds the same Dockerfile, publishes `claim-zero:latest` to ECR, and rolls the **existing** ECS service. You do not create a second cluster, a second instance, Fargate, or a load balancer.

### Where We Came From

Stage 4 proved `http://PUBLIC_IP`. Lab 4.3 (if you ran it) was the manual loop: edit → `docker build` → push ECR → `force-new-deployment`.

### Where We Are Now

You will put the project on GitHub, add a CodeBuild recipe (`buildspec.yml`), and apply one extra Terraform file for a **V1** pipeline.

### Where We Are Going

A GitHub push becomes the release. After one successful automated deploy, you destroy the stack in Lab 5.6.

### Restaurant Context

The recipe book moves off the laptop. GitHub holds the recipe. CodePipeline is the head chef: it hears “new recipe,” sends prep (CodeBuild) to package the meal, stores it in the distribution centre (ECR), and tells the kitchen (ECS) to plate it. The dining room is still the same `t3.micro` counter from Stage 3.

### Technical Context

```text
developer git push
        │
        ▼
     GitHub (main)
        │
        ▼
 CodePipeline V1  (one pipeline — Free Tier)
   ├─ Source   GitHub via one connection
   ├─ Build    CodeBuild SMALL → docker build → ecr push
   └─ Deploy   ECS (imagedefinitions.json)
        │
        ▼
     ECR  claim-zero:latest
        │
        ▼
 ECS  claim-zero-service  (already on t3.micro)
```

**Free Tier lock (do not leave this path):**

| Use | Why |
|-----|-----|
| **One** CodePipeline **V1** named `claim-zero-pipeline` | 1 free active V1 pipeline / month; new V1 pipelines are also free for 30 days. Do **not** choose V2. |
| CodeBuild **`BUILD_GENERAL1_SMALL` only** | 100 always-free minutes / month. This app is about 5–10 minutes per run. |
| **At most two** pipeline runs | Lab 5.4 (first success) + Lab 5.5 (GitHub proof). Stop after that. |
| CodeBuild **not in a VPC** | A VPC without NAT cannot pull Docker Hub base images. NAT is paid. |
| **Privileged** CodeBuild | Required to `docker build` inside the build. |
| Keep ECS on **`t3.micro`** | Same host as Stage 3. No Fargate. |
| Destroy **today** | The instance and public IP are still the cost risk, not the pipeline. |

**Still out of scope:** Fargate, Application Load Balancer, NAT Gateway, CodePipeline V2, CodeBuild medium/large, a second pipeline, CodeDeploy, Secrets Manager.

**Hard prerequisite:** Stage 4 must still be live (`claim-zero-service` Running = 1). Stage 5 does **not** recreate ECS.

### Why This Stage Matters

A laptop `docker push` does not scale to a team. CI/CD means: the source in GitHub is what got deployed, and the build ran in AWS — not on one person’s machine.

### What We Will Produce

A GitHub repository, `buildspec.yml`, `terraform/pipeline.tf`, one V1 pipeline, and browser proof that a push updated `http://PUBLIC_IP` without a local `docker build`.

### Architecture Snapshot

```text
GitHub main  →  CodePipeline V1  →  CodeBuild SMALL  →  ECR  →  ECS on t3.micro
                                                                      │
                                                                      ▼
                                                              http://PUBLIC_IP
```

### SOFTWARE DELIVERY PROGRESS: ✓ Starter ready → ✓ 0 Smoke check → ✓ 1 Package → ✓ 2 Publish → ✓ 3 Provision → ✓ 4 Prove → ► 5 Pipeline

### Learning Outcomes

- Push the course project to GitHub without committing Terraform state or secrets  
- Author a CodeBuild `buildspec.yml` that repeats Stage 2 (build, tag, push)  
- Apply one V1 pipeline with Terraform and complete the GitHub connection handshake  
- Prove a `git push` updates the live site  
- Destroy pipeline and compute in the same sitting  

### Key Terminology

| Term | Meaning |
|------|---------|
| Source | Where the pipeline reads code (here: GitHub `main`) |
| CodeBuild | AWS service that runs `buildspec.yml` (here: `docker build`) |
| CodePipeline V1 | One pipeline billed as “active pipeline,” not per action-minute |
| Connection | GitHub App link AWS uses to clone your repo |
| `imagedefinitions.json` | File CodeBuild writes so the ECS deploy action knows which image to roll |
| Release change | Manual “run the pipeline now” button in the console |

---

## Lab 5.1 — Author `.gitignore` and `buildspec.yml`

### Objective

Create the two files the pipeline needs: a Git ignore list so state and secrets stay off GitHub, and a CodeBuild recipe that does what your laptop did in Stage 2.

### Why this lab exists

CodeBuild only sees what GitHub contains. If `buildspec.yml` is missing, the Build stage fails. If `terraform.tfstate` is committed, you leak infrastructure state. CodeBuild runs Linux, not your Windows laptop — the recipe must be this file, not a local PowerShell history.

### Procedure

1. Right-click the **project root** (the folder that contains `package.json` and `Dockerfile`).  
2. Click **New File**.  
3. Name it `.gitignore`.  
4. Paste the content below from this course guide:

```text
# Laptop install — CodeBuild runs npm install inside Docker, not from this folder.
node_modules/

# Local Vite output — the image build produces dist/ inside Docker.
dist/

# Terraform working files — never commit state or the lock/plugin cache.
.terraform/
*.tfstate
*.tfstate.*
.terraform.lock.hcl
crash.log

# Local variable values (your GitHub owner/repo). Keep them on the laptop.
*.tfvars
!*.tfvars.example
```

5. Press **Ctrl + S**.  
6. Right-click the **project root**.  
7. Click **New File**.  
8. Name it `buildspec.yml` (this name is required — CodeBuild looks for it at the repo root).  
9. Paste the content below from this course guide:

```yaml
# CLAIM ZERO — CodeBuild recipe (Lab 5.1).
# This is Stage 2 on AWS: login to ECR, docker build, push claim-zero:latest.
# Keep it short. No tests, no second image, no docker compose.

version: 0.2

phases:
  pre_build:
    commands:
      - ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
      - REGION=us-east-1
      - REPO=claim-zero
      - IMAGE_URI=$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO:latest
      - echo Logging in to Amazon ECR
      - aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
  build:
    commands:
      - echo Build started on `date`
      - docker build -t $REPO:latest .
      - docker tag $REPO:latest $IMAGE_URI
  post_build:
    commands:
      - echo Pushing $IMAGE_URI
      - docker push $IMAGE_URI
      # Container name MUST match the task definition (claim-zero).
      - printf '[{"name":"claim-zero","imageUri":"%s"}]' $IMAGE_URI > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json
```

10. Press **Ctrl + S**.

### Verification

- Confirm `.gitignore` and `buildspec.yml` sit beside `Dockerfile` in the project root.  
- **Expected State:** Pipeline inputs exist on disk; nothing has been pushed yet.

### Troubleshooting References

¹ **Symptom:** File is named `buildspec.yml.txt`.  
  **Resolution:** Rename to `buildspec.yml` (no extra extension). Windows File Explorer may hide extensions — check in VS Code.

---

## Lab 5.2 — Create a GitHub repository and push

### Objective

Put the course project on GitHub so CodePipeline has a `main` branch to watch.

### Why this lab exists

AWS cannot clone files that exist only on your laptop. GitHub is the source of truth for Stage 5. The pipeline will build **whatever is on `main`**, including the Dockerfile from Stage 1.

### Procedure

1. Confirm Git is installed. If a previous command is occupying the terminal, press **Ctrl + C** first:

```bash
git --version
```

2. Open [https://github.com/new](https://github.com/new) in a browser. Sign in.  
3. Repository name: type `claim-zero` exactly.  
4. Visibility: **Public** (Private is also fine on GitHub Free).  
5. Do **not** tick Add a README, Add .gitignore, or Choose a license — your project already has files.  
6. Click **Create repository**.  
7. Copy your GitHub **username** (the owner in `https://github.com/USERNAME/claim-zero`). You will paste it into Terraform in Lab 5.3.  
8. In VS Code, confirm you are in the **project root** (the folder that contains `package.json`). If you are inside `terraform`, go up one level:

```bash
cd ..
```

Repeat `cd ..` if you still need to go up.  
9. Initialise Git, name the branch `main`, and make the first commit. If Git asks for `user.email` / `user.name`, set them for your GitHub identity, then retry the commit:

```bash
git init
git branch -M main
git add .
git status
```

10. Confirm `git status` does **not** list `terraform.tfstate`, `.terraform/`, or `node_modules/`. If it does, stop and fix `.gitignore`, then run `git add .` again.  
11. Commit:

```bash
git commit -m "Claim Zero source for CodePipeline"
```

12. Attach GitHub as `origin`. Replace `YOUR_GITHUB_USERNAME` with the username from step 7:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/claim-zero.git
git push -u origin main
```

13. If a browser window opens, sign in to GitHub and allow access.  
14. If Git asks for a **password**, do **not** type your GitHub account password. Create a Personal Access Token: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → generate a token with **repo** scope → paste that token as the password.  
15. Refresh `https://github.com/YOUR_GITHUB_USERNAME/claim-zero` and confirm `Dockerfile`, `buildspec.yml`, and `src/` are visible on `main`.

### Verification

- Confirm `main` on GitHub contains `buildspec.yml` and `Dockerfile`.  
- **Expected State:** Source is cloneable. Pipeline can be created next.

### Troubleshooting References

¹ **Symptom:** `git: command not found`.  
  **Resolution:** Install Git for Windows; close and reopen the VS Code terminal; retry `git --version`.  
² **Symptom:** `remote origin already exists`.  
  **Resolution:** `git remote remove origin`, then run the `git remote add` command again.  
³ **Symptom:** Push rejected / non-fast-forward because GitHub already has a README.  
  **Resolution:** You created the GitHub repo with a README. Delete that repo, recreate it **empty**, and push again.  
⁴ **Symptom:** Authentication failed.  
  **Resolution:** Use the browser sign-in prompt or a **repo** Personal Access Token, not your GitHub password.

---

## Lab 5.3 — Author the pipeline Terraform and allow a rolling replace

### Objective

Add `terraform/pipeline.tf` (one V1 pipeline, SMALL CodeBuild, no VPC) and two lines on the existing ECS service so a new task can replace the old one on a single host port 80.

### Why Are We Doing It This Way?

Stage 3 already created the kitchen. This file only adds the head chef. Destroy still uses the same `terraform` folder, so Lab 5.6 removes pipeline **and** compute together.

This instance maps **host port 80**. Two tasks cannot bind 80 at once. Setting minimum healthy percent to **0** lets ECS stop the old task before starting the new one. Without that, the pipeline deploy can stall.

### Procedure

1. Open `terraform/main.tf`.  
2. Find `resource "aws_ecs_service" "app"`.  
3. Immediately after the `launch_type = "EC2"` line, add these two lines (keep the rest of the resource unchanged):

```hcl
  # Host port 80 can only be used by one task on this instance.
  # 0% min healthy lets ECS stop the old task before starting the new one.
  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 100
```

4. Press **Ctrl + S**.  
5. Right-click the `terraform` folder.  
6. Click **New File**.  
7. Name it `pipeline.tf`.  
8. Paste the full configuration below from this course guide.  
9. Press **Ctrl + S**.

```hcl
# =============================================================================
# CLAIM ZERO — Free Tier CI/CD (Stage 5)
# One CodePipeline V1 + CodeBuild SMALL. No Fargate / ALB / NAT / V2.
# Paste this entire file into terraform/pipeline.tf (Lab 5.3).
# =============================================================================

# GitHub owner/repo from terraform.tfvars (Lab 5.3). Example: jane/claim-zero
variable "github_full_repo" {
  description = "GitHub owner/name for the claim-zero repository"
  type        = string
}

# -----------------------------------------------------------------------------
# GitHub connection — Terraform creates it as PENDING.
# You complete the handshake in the console (Lab 5.4) before Source can clone.
# -----------------------------------------------------------------------------
resource "aws_codestarconnections_connection" "github" {
  name          = "claim-zero-github"
  provider_type = "GitHub"
}

# -----------------------------------------------------------------------------
# Artifact bucket — CodePipeline V1 must store zipped source/build output.
# Account ID in the name keeps it globally unique. 1-day expiry. Private.
# -----------------------------------------------------------------------------
resource "aws_s3_bucket" "artifacts" {
  bucket        = "claim-zero-artifacts-${local.account_id}"
  force_destroy = true

  tags = {
    Project = local.project
  }
}

resource "aws_s3_bucket_public_access_block" "artifacts" {
  bucket                  = aws_s3_bucket.artifacts.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_lifecycle_configuration" "artifacts" {
  bucket = aws_s3_bucket.artifacts.id

  rule {
    id     = "expire-artifacts-1-day"
    status = "Enabled"

    filter {
      prefix = ""
    }

    expiration {
      days = 1
    }
  }
}

# -----------------------------------------------------------------------------
# ECR lifecycle on the existing Stage 2 repo — keep the private repo small.
# Destroy removes this policy only; the ECR repository itself stays.
# -----------------------------------------------------------------------------
resource "aws_ecr_lifecycle_policy" "claim" {
  repository = local.project

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 2 images"
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 2
      }
      action = {
        type = "expire"
      }
    }]
  })
}

# Short retention for CodeBuild logs (workshop only).
resource "aws_cloudwatch_log_group" "codebuild" {
  name              = "/codebuild/${local.project}"
  retention_in_days = 1

  tags = {
    Project = local.project
  }
}

# -----------------------------------------------------------------------------
# IAM — CodeBuild may login to ECR, push claim-zero:latest, write logs, read S3.
# -----------------------------------------------------------------------------
resource "aws_iam_role" "codebuild" {
  name = "${local.project}-codebuild-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "codebuild.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "codebuild" {
  name = "${local.project}-codebuild-policy"
  role = aws_iam_role.codebuild.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject"
        ]
        Resource = "${aws_s3_bucket.artifacts.arn}/*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload"
        ]
        Resource = "arn:aws:ecr:${local.region}:${local.account_id}:repository/${local.project}"
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# CodeBuild — BUILD_GENERAL1_SMALL, privileged (docker build), NOT in a VPC.
# -----------------------------------------------------------------------------
resource "aws_codebuild_project" "claim" {
  name         = "${local.project}-build"
  description  = "CLAIM ZERO Free Tier docker build"
  service_role = aws_iam_role.codebuild.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux-x86_64-standard:5.0"
    type                        = "LINUX_CONTAINER"
    privileged_mode             = true
    image_pull_credentials_type = "CODEBUILD"
  }

  source {
    type = "CODEPIPELINE"
  }

  logs_config {
    cloudwatch_logs {
      group_name = aws_cloudwatch_log_group.codebuild.name
    }
  }

  tags = {
    Project = local.project
  }
}

# -----------------------------------------------------------------------------
# IAM — CodePipeline may use the GitHub connection, start CodeBuild, deploy ECS.
# -----------------------------------------------------------------------------
resource "aws_iam_role" "codepipeline" {
  name = "${local.project}-codepipeline-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "codepipeline.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "codepipeline" {
  name = "${local.project}-codepipeline-policy"
  role = aws_iam_role.codepipeline.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:GetBucketVersioning",
          "s3:PutObject"
        ]
        Resource = [
          aws_s3_bucket.artifacts.arn,
          "${aws_s3_bucket.artifacts.arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "codebuild:BatchGetBuilds",
          "codebuild:StartBuild"
        ]
        Resource = aws_codebuild_project.claim.arn
      },
      {
        Effect = "Allow"
        Action = [
          "codestar-connections:UseConnection",
          "codeconnections:UseConnection"
        ]
        Resource = aws_codestarconnections_connection.github.arn
      },
      {
        Effect = "Allow"
        Action = [
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:DescribeTasks",
          "ecs:ListTasks",
          "ecs:RegisterTaskDefinition",
          "ecs:UpdateService"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = "iam:PassRole"
        Resource = aws_iam_role.ecs_execution.arn
        Condition = {
          StringEqualsIfExists = {
            "iam:PassedToService" = ["ecs-tasks.amazonaws.com"]
          }
        }
      }
    ]
  })
}

# -----------------------------------------------------------------------------
# One V1 pipeline: Source (GitHub) → Build (SMALL) → Deploy (existing ECS).
# pipeline_type = "V1" is required — do not let this become V2.
# -----------------------------------------------------------------------------
resource "aws_codepipeline" "claim" {
  name          = "${local.project}-pipeline"
  pipeline_type = "V1"
  role_arn      = aws_iam_role.codepipeline.arn

  artifact_store {
    location = aws_s3_bucket.artifacts.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn        = aws_codestarconnections_connection.github.arn
        FullRepositoryId     = var.github_full_repo
        BranchName           = "main"
        DetectChanges        = "true"
        OutputArtifactFormat = "CODE_ZIP"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]

      configuration = {
        ProjectName = aws_codebuild_project.claim.name
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      version         = "1"
      input_artifacts = ["build_output"]

      configuration = {
        ClusterName = aws_ecs_cluster.claim.name
        ServiceName = aws_ecs_service.app.name
        FileName    = "imagedefinitions.json"
      }
    }
  }

  tags = {
    Project = local.project
  }
}

output "pipeline_name" {
  value = aws_codepipeline.claim.name
}

output "github_connection_arn" {
  value = aws_codestarconnections_connection.github.arn
}
```

10. Right-click the `terraform` folder.  
11. Click **New File**.  
12. Name it `terraform.tfvars`.  
13. Replace `YOUR_GITHUB_USERNAME` with the GitHub owner from Lab 5.2 (no `https://`, no `.git`):

```hcl
github_full_repo = "YOUR_GITHUB_USERNAME/claim-zero"
```

14. Press **Ctrl + S**.  
15. Confirm `.gitignore` will keep this file off GitHub (it matches `*.tfvars`).

### Verification

- Confirm `terraform/pipeline.tf` and `terraform/terraform.tfvars` exist.  
- Confirm `main.tf` service block now has `deployment_minimum_healthy_percent = 0`.  
- **Expected State:** Blueprint ready; GitHub handshake not done yet.

### Troubleshooting References

¹ **Symptom:** Forgot to replace `YOUR_GITHUB_USERNAME`.  
  **Resolution:** Edit `terraform.tfvars` to `owner/claim-zero` exactly as shown on GitHub.

---

## Lab 5.4 — Apply, complete the GitHub connection, first pipeline run

### Objective

Create the pipeline resources, finish the GitHub App handshake, and wait for **one** successful run (Source → Build → Deploy).

### Command Context

`terraform plan` must show **one** pipeline, CodeBuild **SMALL**, and **no** ALB / Fargate / NAT.  
`terraform apply` creates the GitHub connection in **PENDING** status. Source cannot clone until you complete the handshake in the console.

This first **Succeeded** run is pipeline run 1 of 2 allowed in this course. Do not click **Release change** extra times.

### Procedure

1. Enter the `terraform` folder. If you are in the project root, run `cd terraform`. If a command is occupying the terminal, press **Ctrl + C** first:

```bash
cd terraform
```

2. If `pipeline_type` is unknown to an old provider plugin, upgrade the AWS provider, then continue:

```bash
terraform init -upgrade
```

3. Preview the extra resources. Confirm the plan includes `aws_codepipeline.claim`, `BUILD_GENERAL1_SMALL`, and does **not** include an ALB, Fargate, or NAT Gateway:

```bash
terraform plan
```

4. If the plan looks wrong, stop. Do not apply. Re-paste `pipeline.tf` from Lab 5.3.  
5. Apply. Type `yes` when prompted:

```bash
terraform apply
```

6. Wait for `Apply complete!`.  
7. Open the AWS Console. Confirm the Region is **`us-east-1`**.  
8. In the search bar, type `Connections`. Open **Settings → Connections** (Developer Tools / CodeConnections).  
9. Open the connection named `claim-zero-github`. Status should be **Pending**.  
10. Click **Update pending connection**.  
11. Click **Install a new app** (or select **AWS Connector for GitHub** if you already installed it).  
12. In the GitHub browser window, sign in.  
13. Choose **Only select repositories** → select `claim-zero` → click **Install** / **Connect**.  
14. Wait until the connection status is **Available**. Do not continue while it is Pending.  
15. Open **CodePipeline** → **Pipelines** → `claim-zero-pipeline`.  
16. If the latest execution failed at **Source** (connection was still Pending), click **Release change** **once**.  
17. Open the **Build** stage → the CodeBuild link. Wait until the build **Succeeded** (often 5–10 minutes). This uses Free Tier SMALL minutes — stay on this one run.  
18. When the pipeline execution is **Succeeded**, open Amazon ECS → `claim-zero-cluster` → `claim-zero-service`. Confirm a new deployment and **Running tasks = 1**.  
19. Refresh `http://PUBLIC_IP` (same URL as Stage 4). The landing page should still load.

### Verification

- Confirm connection **Available**, pipeline execution **Succeeded**, ECS Running = 1.  
- **Expected State:** AWS built and deployed `claim-zero:latest` without a laptop `docker push`.

### Troubleshooting References

¹ **Symptom:** Plan shows `pipeline_type` V2 or no `pipeline_type`.  
  **Resolution:** Confirm `pipeline_type = "V1"` in `pipeline.tf`; run `terraform init -upgrade`; re-plan.  
² **Symptom:** Plan shows an ALB, Fargate, NAT, or `BUILD_GENERAL1_MEDIUM`.  
  **Resolution:** You pasted the wrong file. Replace `pipeline.tf` with Lab 5.3 and re-plan. Do not apply.  
³ **Symptom:** `No value for required variable github_full_repo`.  
  **Resolution:** Create `terraform/terraform.tfvars` as in Lab 5.3; stay in the `terraform` folder.  
⁴ **Symptom:** Source fails with connection not available / not in AVAILABLE state.  
  **Resolution:** Finish steps 8–14; wait for **Available**; click **Release change** once.  
⁵ **Symptom:** Build fails `Cannot connect to the Docker daemon`.  
  **Resolution:** Confirm `privileged_mode = true` on the CodeBuild project; re-apply; Release change once.  
⁶ **Symptom:** Build fails pulling `node:22-alpine` (Docker Hub rate limit).  
  **Resolution:** Wait a few minutes; Release change **once**. Do not switch CodeBuild into a VPC.  
⁷ **Symptom:** Deploy fails / task cannot start, port 80 already in use.  
  **Resolution:** Confirm Lab 5.3 added `deployment_minimum_healthy_percent = 0`; apply again; wait for the old task to stop.  
⁸ **Symptom:** `imagedefinitions.json` / container name mismatch.  
  **Resolution:** `buildspec.yml` must use `"name":"claim-zero"` — the same name as the task definition container.

---

## Lab 5.5 — Prove GitHub is the trigger

### Objective

Change visible text in the app, `git push` to `main`, and confirm the live site updates **without** running `docker build` or `aws ecs` on the laptop.

### Why this lab exists

Lab 5.4 proved the pipeline can run. This lab proves **GitHub** started it. That is the quality gate for Stage 5. This is pipeline run 2 of 2. Do not trigger a third run.

### Procedure

1. Return to the **project root** (the folder that contains `src/App.jsx`). If you are in `terraform`, go up:

```bash
cd ..
```

2. Open `src/App.jsx`.  
3. Change the tagline text. For example, change:

```text
Building the Next Generation of Cloud Engineers.
```

to:

```text
Building the Next Generation of Cloud Engineers — shipped from GitHub.
```

4. Press **Ctrl + S**.  
5. Do **not** run `docker build`, `docker push`, or `aws ecs update-service`.  
6. Commit and push `main`:

```bash
git add src/App.jsx
git commit -m "Visible proof for CodePipeline"
git push origin main
```

7. Open CodePipeline → `claim-zero-pipeline`. A new execution should start from the push (wait up to a minute).  
8. Wait until the execution is **Succeeded**.  
9. Wait until ECS Running tasks = 1 for the new deployment (2–5 minutes).  
10. Open `http://PUBLIC_IP`. Hard-refresh the browser (**Ctrl + F5**).  
11. Confirm the new tagline is visible.

### Verification

- Confirm you did not run Docker or `aws ecs` locally.  
- Confirm the pipeline ran after the push and the browser shows the new sentence.  
- **Expected State:** GitHub is the release trigger. Stop. Do not run the pipeline again.

### Troubleshooting References

¹ **Symptom:** Pipeline does not start after push.  
  **Resolution:** Confirm you pushed `main` (not another branch); connection is **Available**; `DetectChanges` is true; wait one minute; check GitHub repo name matches `terraform.tfvars`.  
² **Symptom:** Pipeline Succeeded but the page is unchanged.  
  **Resolution:** Hard-refresh (**Ctrl + F5**); wait for the new ECS task; confirm Build pushed `claim-zero:latest`.  
³ **Symptom:** You already used two successful runs and want to try again.  
  **Resolution:** Stop. Extra builds spend the 100-minute CodeBuild grant. Go to Lab 5.6.

---

## Lab 5.6 — Destroy the pipeline and the compute stack

### Objective

Remove everything Terraform created in this sitting: pipeline, CodeBuild, connection, S3 artifacts, and the Stage 3 ECS/`t3.micro` stack. Confirm the instance is terminated.

### Command Context

`terraform destroy` uses the same state that created Stages 3 and 5. One destroy closes the restaurant and fires the head chef. The ECR **repository** from Stage 2 remains (empty-ish because of the lifecycle policy). The GitHub **repository** remains — that is not an AWS charge.

Leaving the `t3.micro` running overnight is the cost failure for this course, not the pipeline.

### Procedure

1. You must be in the `terraform` folder (the folder that contains `main.tf` and `pipeline.tf`).  
   - If you are in the project root, enter the folder: `cd terraform`.  
   - If you went up a level for Lab 5.5, run `cd terraform` again.  
   - If you are too deep, run `cd ..` until you are in `terraform`.  
   - If a command is occupying the terminal, press **Ctrl + C** first.

```bash
cd terraform
terraform destroy
```

2. Type `yes` when prompted.  
3. Wait for destroy to finish.  
4. Open **EC2** → **Instances** in `us-east-1`. Confirm the workshop instance is **terminated** (not stopped, not running).  
5. Open **CodePipeline** → confirm `claim-zero-pipeline` is gone.  
6. Open **Connections**. If `claim-zero-github` is still listed, select it → **Delete**.  
7. Optional: Amazon ECR → `claim-zero` → delete leftover images if any remain. Do not leave a running instance to “clean up tomorrow.”

### Verification

- Confirm EC2 instance **terminated**, pipeline gone, connection deleted.  
- **Expected State:** No workshop compute. GitHub repo may stay.

### Troubleshooting References

¹ **Symptom:** Destroy fails on S3 (bucket not empty).  
  **Resolution:** `force_destroy = true` is in `pipeline.tf`. Re-run `terraform destroy`. Empty the bucket in the S3 console only if destroy still fails, then destroy again.  
² **Symptom:** Destroy fails on IAM / resource busy.  
  **Resolution:** Re-run `terraform destroy`. Do not delete the EC2 instance by hand unless destroy cannot complete; then destroy again so state matches.  
³ **Symptom:** Connection remains after destroy.  
  **Resolution:** Delete `claim-zero-github` in the Connections console (step 6).

---

### Stage Completion Criteria

Do not treat the course as finished until all checks pass:

- [ ] `.gitignore` and `buildspec.yml` authored in the project root  
- [ ] GitHub `main` contains the Dockerfile and `buildspec.yml`  
- [ ] `terraform plan` showed **V1** + **SMALL** and no ALB / Fargate / NAT  
- [ ] GitHub connection **Available**  
- [ ] One GitHub-triggered pipeline run updated the live page  
- [ ] At most two pipeline executions in this sitting  
- [ ] `terraform destroy` completed; EC2 instance **terminated**  

### What We Have Accomplished

You connected GitHub to AWS CI/CD: a push built the image in CodeBuild, published it to ECR, and deployed the existing ECS service — still one `t3.micro`, still Free Tier–shaped.

### Where We Are Now

**Artefact state:** Workshop infrastructure removed. GitHub repository remains as your record of the source.

### Common Errors & Resolutions (Stage 5)

| # | Error / symptom | Likely cause | Resolution |
|---|-----------------|--------------|------------|
| 1 | `git: command not found` | Git not installed | Install Git; new terminal; `git --version` |
| 2 | `buildspec.yml` missing in CodeBuild | File not on `main`, or wrong name | Confirm GitHub root has `buildspec.yml`; push; Release change **once** |
| 3 | Plan shows V2 / ALB / Fargate / NAT / MEDIUM | Wrong `pipeline.tf` | Re-paste Lab 5.3; do not apply until the plan is clean |
| 4 | Source: connection pending | Handshake not finished | Connections → Update pending connection → wait **Available** |
| 5 | `github_full_repo` empty / wrong | `terraform.tfvars` missing or still `YOUR_GITHUB_USERNAME` | Set `owner/claim-zero`; re-apply |
| 6 | Docker daemon / privileged | CodeBuild not privileged | `privileged_mode = true`; re-apply |
| 7 | Deploy port 80 conflict | Min healthy still 100% | Add Lab 5.3 service lines; apply; wait for old task to stop |
| 8 | Page unchanged after Succeeded | Browser cache or task not replaced yet | Ctrl+F5; wait Running=1; confirm new image in ECR |
| 9 | Third pipeline run | Extra Release change / extra push | Stop and destroy (Lab 5.6) |
| 10 | `terraform destroy` incomplete | S3 objects or IAM race | Re-run destroy; confirm EC2 **terminated** |

### Stage Summary

Stage 2 was “I pushed the image.” Stage 5 is “GitHub pushed the image.” Same container, same cluster. Then you closed the temporary restaurant.

---

# Course complete

You finished the Claim Zero1:

0. **Checked** the starter React app locally (`npm run build` and `npm run dev`)  
1. **Packaged** the starter React app into `claim-zero:latest` with Docker  
2. **Published** the image to Amazon ECR  
3. **Provisioned** Free Tier–aligned ECS-on-EC2 infrastructure with Terraform  
4. **Proved** the service in a browser over `http://PUBLIC_IP`  
5. **Connected** GitHub so CodePipeline V1 + CodeBuild SMALL rebuild and redeploy that same service  

That is the professional delivery loop — from container packaging to cloud runtime evidence to automated release — without rebuilding the application from scratch, and without leaving Free Tier–shaped limits.
