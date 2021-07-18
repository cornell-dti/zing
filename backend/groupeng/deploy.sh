#!/bin/bash

gcloud functions deploy create_groups \
 --runtime python38 \
 --trigger-http \
 --allow-unauthenticated 