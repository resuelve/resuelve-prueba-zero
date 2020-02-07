#
# Makefile for resuelve-prueba-zero
#
# author: Jorge Medina
# desc: Script to build, test and release docker image.


# DOCKER IMAGE ENV VARS
DOCKER_ORG=jmedinaresolv
PRUEBA_APP_NAME = resuelve-prueba-zero
PRUEBA_APP_VERSION = latest
PRUEBA_DOCKER_REPO = ${PRUEBA_APP_NAME}:${PRUEBA_APP_VERSION}
APP_PORT = 8080:8080

.PHONY: all build test release clean help

all: help

build:
	@echo "Building ${PRUEBA_DOCKER_REPO} image."
	docker build -t ${DOCKER_ORG}/${PRUEBA_DOCKER_REPO} .
	@echo "Listing ${PRUEBA_DOCKER_REPO} image."
	docker images | grep ${PRUEBA_APP_NAME}

test:
	@echo "Run ${PRUEBA_DOCKER_REPO} image."
	docker run --name ${PRUEBA_APP_NAME} -p ${APP_PORT} -d ${DOCKER_ORG}/${PRUEBA_DOCKER_REPO} &
	@echo "Wait until ${PRUEBA_DOCKER_REPO} is fully started."
	sleep 5
	docker logs ${PRUEBA_APP_NAME}

release:
	@echo "Push ${PRUEBA_DOCKER_REPO} image to docker registry."
	docker tag ${DOCKER_ORG}/${PRUEBA_DOCKER_REPO} ${DOCKER_ORG}/${PRUEBA_DOCKER_REPO}
	docker push ${DOCKER_ORG}/${PRUEBA_DOCKER_REPO}

clean:
	@echo ""
	@echo "Cleaning local build environment."
	@echo ""
	docker stop ${PRUEBA_APP_NAME} 2>/dev/null; true
	docker rm ${PRUEBA_APP_NAME} 2>/dev/null; true
	@echo ""
	@echo "Purging local images."
	docker rmi ${PRUEBA_DOCKER_REPO} 2>/dev/null; true

help:
	@echo ""
	@echo "Please use \`make <target>' where <target> is one of"
	@echo ""
	@echo "  build		Builds the docker image."
	@echo "  test		Tests image."
	@echo "  release	Releases images."
	@echo "  clean		Cleans local images."
	@echo ""
	@echo ""

