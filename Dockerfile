FROM debian:stable-slim

# Install the base system requirements: python, pip
RUN apt-get update && apt-get install -y --no-install-recommends \
		python2.7 \
		python-pip\
&& rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip setuptools wheel

ENV LIBREANT_INST_DIR /libreant

ARG ES_VERSION
ENV ES_VERSION=$ES_VERSION

# Import libreant source from current local folder
ADD . ${LIBREANT_INST_DIR}/

# Install libreant
WORKDIR $LIBREANT_INST_DIR
RUN pip install .

EXPOSE 5000

CMD libreant
