# Staff Update Form

A web application for submitting SDPR SDD staff updates, built with React and Node.js.

## Project Purpose

This tool provides a webform for staff to submit updates such as new hires, information changes, temporary appointments, position movements, and exits. It uses Keycloak for authentication, and sends pdf forms as email notifications.

The form uses both a client and a server backend. The form is presented and information is collected using the client frontend, and the backend is being used to send the email.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
git clone https://github.com/<your-org>/staff-update-form.git
cd staff-update-form/client
npm install
```

### Building for Dev

```sh
oc -n bcd07f-dev start-build staff-update-form --follow
oc -n bcd07f-dev set image deployment/staff-update-form staff-update-form=staff-update-form:latest
oc -n bcd07f-dev tag bcd07f-dev/staff-update-form:latest staff-update-form:latest

oc -n bcd07f-dev start-build staff-update-form-server --follow
oc -n bcd07f-dev set image deployment/staff-update-form-server staff-update-form-server=staff-update-form-server:latest
oc -n bcd07f-dev tag bcd07f-dev/staff-update-form-server:latest staff-update-form-server:latest
```

### Building for Test

```sh
oc -n bcd07f-test start-build staff-update-form --follow
oc -n bcd07f-test set image deployment/staff-update-form staff-update-form=image-registry.openshift-image-registry.svc:5000/bcd07f-test/staff-update-form:latest
oc -n bcd07f-test tag bcd07f-test/staff-update-form:latest staff-update-form:latest

oc -n bcd07f-test start-build staff-update-form-server --follow
oc -n bcd07f-test set image deployment/staff-update-form-server staff-update-form-server=staff-update-form-server:latest
oc -n bcd07f-test tag bcd07f-test/staff-update-form-server:latest staff-update-form-server:latest
```

### Building for Prod

```sh
oc -n bcd07f-prod start-build staff-update-form --follow
oc -n bcd07f-prod set image deployment/staff-update-form staff-update-form=staff-update-form:latest
oc -n bcd07f-prod tag bcd07f-prod/staff-update-form:latest staff-update-form:latest

oc -n bcd07f-prod start-build staff-update-form-server --follow
oc -n bcd07f-prod set image deployment/staff-update-form-server staff-update-form-server=staff-update-form-server:latest
oc -n bcd07f-prod tag bcd07f-prod/staff-update-form-server:latest staff-update-form-server:latest
```

## Deployment

See the `/client/Dockerfile` for containerization instructions.  

