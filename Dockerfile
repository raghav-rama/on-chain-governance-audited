FROM --platform=linux/amd64 ubuntu:focal

ENV PATH="$HOME/.cargo/bin:$PATH"

WORKDIR /labs

# Install dependencies that don't change often
RUN apt-get update && \
  apt-get install -y libssl-dev python3-dev python3-pip curl && \
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
  export PATH="$HOME/.cargo/bin:$PATH"

# Copy the entire project
COPY . /labs/

# Install Python dependencies
RUN pip3 install solc-select slither-analyzer mythril

# Run the script
RUN bin/svm