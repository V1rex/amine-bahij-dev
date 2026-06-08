---
title: "Why I am building Lift Nexus API"
description: "A technical reflection on building a Spring Boot backend MVP for warehouse dispatch optimization."
date: "2026-06-07"
coverImage: "/images/writing/warehouse-photo.jpg"
coverAlt: "Warehouse storage racks"
tags: ["Backend", "Spring Boot", "Optimization", "Logistics"]
draft: false
------------

**[Lift Nexus API](https://lift-nexus.amine-bahij.dev/) is my current main project.**

I am building it to explore a question that became increasingly important to me while learning how to implement mathematical optimization models with [Gurobi](https://www.gurobi.com/):

> How can an optimization model become part of a backend system that can be used, tested, documented, and extended?

The project is not a production warehouse management system. It is a deliberately scoped MVP, and also a sandbox where I practice backend engineering while keeping a connection to operations research and decision-oriented software. Even as a learning project, I try to treat it with engineering discipline: clear scope, honest limitations, tests, documentation, and incremental improvement.

## The idea behind the project

In many optimization contexts, the model is only one part of the system.

A solver may produce a good decision, but a real application also needs APIs, persistence, validation, tests, documentation, and a clear way to represent the state of the world. It also needs a way for a normal user, service, or client application to interact with it.

Lift Nexus API models a simplified warehouse environment. Forklifts, storage bins, load units, and transport orders form the [domain](https://lift-nexus.amine-bahij.dev/site/domain-model/). The system takes a snapshot of the warehouse state, creates a dispatch job, runs an optimization process, and stores the resulting assignments.

At the current stage, the focus is [static dispatching](https://lift-nexus.amine-bahij.dev/site/roadmap/#milestone-1-core-mvp-static-dispatching):

1. create the warehouse state,
2. create transport orders,
3. start a dispatch job,
4. let the solver assign and sequence work,
5. inspect the result.

That scope is intentionally limited. I wanted a first version that is small enough to understand, but still complex enough to force real architectural decisions.

## Why backend first

The main goal of Lift Nexus API is not just to experiment with a solver.

The main goal is to practice building the software around the solver.

My current view is simple:

> An optimization model becomes more valuable when it is accessible, usable, and integrated into a real system.

That philosophy leads to backend and architecture questions:

* Where should solver-specific logic live?
* How should a dispatch job be represented?
* What should be persisted?
* How should the API expose asynchronous work?
* How can the system remain understandable as constraints grow?
* How should limitations be documented honestly?

These are backend and architecture questions as much as optimization questions.

For me, this is the interesting part:

> An optimization model becomes more useful when it is embedded in a system that can receive data, run reliably, expose results, and be improved over time.

## The current stack

The project is built as a Java and Spring Boot backend.

The current stack includes:

* Spring Boot for the REST API and application structure,
* PostgreSQL for persistence,
* Flyway for database migrations,
* Docker Compose for local infrastructure,
* Timefold Solver for constraint-based planning,
* Testcontainers for integration testing,
* GitHub Actions for CI,
* MkDocs for documentation,
* generated reports for project visibility.

This stack is intentionally practical. I wanted to work with tools that are common in backend engineering and useful beyond this single project.

## What the project taught me

One important lesson was that optimization integration is not just about calling a solver.

The surrounding system matters a lot. Clean data, clear domain boundaries, and solid infrastructure should exist before adding something like a `POST /optimize` endpoint.

A dispatch job needs a lifecycle. The domain state needs to be represented clearly. The solver result needs to be mapped back into something the API can expose. [Tests](https://lift-nexus.amine-bahij.dev/site/testing/) need to cover not only isolated services, but also persistence and integration behavior.

I also learned that documenting [limitations](https://lift-nexus.amine-bahij.dev/site/limitations/) is part of engineering.

Limitations show the current weaknesses of a project. But if they are understood clearly, they can become future improvement points instead of hidden problems.

For me, one of the biggest challenges was resisting the temptation to make this [portfolio project](https://lift-nexus.amine-bahij.dev/) sound bigger than it is. The current version is a [static dispatching MVP](https://lift-nexus.amine-bahij.dev/site/roadmap/). It does not claim to solve every real warehouse problem.

Staying grounded and not trying to add every possible feature was one of the best decisions I could make for my learning journey and for the project.

That honesty makes the project easier to evaluate and easier to improve.

## What is intentionally limited

Lift Nexus API is not production-ready.

Some [limitations](https://lift-nexus.amine-bahij.dev/site/limitations/) are intentional at this stage:

* no authentication or authorization,
* simplified warehouse topology,
* simplified distance model,
* limited solver constraints,
* static dispatching instead of continuous reactive planning,
* no production deployment setup yet,
* limited observability.

These are not hidden. They are part of the current MVP boundary.

The goal is to build a clean foundation first, then improve it step by step.

## Why this project matters to me

Lift Nexus API sits at the intersection of two areas I want to build depth in:

* backend systems and [software architecture](https://lift-nexus.amine-bahij.dev/site/architecture/),
* operations research and applied [optimization](https://lift-nexus.amine-bahij.dev/site/optimization/).

I am interested in software systems where decisions have constraints, costs, and measurable consequences. Logistics and energy are especially interesting to me because they are concrete domains: resources are limited, timing matters, and better decisions can create visible improvements.

This project is one step toward that direction.

It helps me practice backend fundamentals while keeping the optimization perspective alive.

## What comes next

The next direction is to make the project more realistic without losing clarity.

Possible [future work](https://lift-nexus.amine-bahij.dev/site/roadmap/) includes:

* richer solver constraints,
* better pathfinding and topology modeling,
* dynamic dispatching when warehouse state changes,
* stronger observability,
* deployment experiments,
* larger benchmark scenarios,
* energy-aware forklift charging decisions.

I do not want to expand the project randomly. Each new feature should be a pragmatic choice that either makes the system more realistic or teaches me something important about backend architecture, optimization, or operational software.

## Closing thought

Lift Nexus API is not meant to be impressive because it is large.

It is meant to be useful as a learning project because it forces me to connect several things I care about: [domain modeling](https://lift-nexus.amine-bahij.dev/site/domain-model/), [backend architecture](https://lift-nexus.amine-bahij.dev/site/architecture/), [testing](https://lift-nexus.amine-bahij.dev/site/testing/), [documentation](https://lift-nexus.amine-bahij.dev/site/), and [optimization](https://lift-nexus.amine-bahij.dev/site/optimization/).

That is the kind of software I want to become better at building.

*Cover Photo by [Jacques Dillies](https://unsplash.com/de/@jacques_dillies) on [Unsplash](https://unsplash.com/)*
