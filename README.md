# AmoCRM Swagger test API implementation

English | [Русский](https://github.com/volveezz/amo-crm-showcase/blob/master/README_ru.md)

## Overview

This repository offers a backend solution that uses NestJS, Swagger and AmoCRM API.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - [Cloning the Repository](#cloning-the-repository)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Production Build](#production-build)

## Requirements

- **Node.js**: Ensure Node.js is installed.
- **PNPM**: Recommended as the package manager.
- **AmoCRM account**: Required for accessing the AmoCRM API.

## Installation

### Cloning the Repository

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/volveezz/amo-crm-showcase.git
cd amo-crm-showcase
```

## Configuration

1. **Environment Variables:**  
   Rename `.env.example` to `.env` or create a new `.env` file based on the example provided.

2. **Paste AmoCRM API tokens, endpoints, and specify the exact host name and port**:  
   When setting up the AmoCRM integration, ensure that you specify the exact host name and port number for proper API communication.

## Usage

To run the project, execute the following command:

```bash
pnpm install && pnpm build && pnpm start:prod
```
