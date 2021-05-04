#!/bin/bash

gcloud functions deploy create_groups \
 --runtime python38 \
 --trigger-resource=zing-backend.appspot.com \
 --trigger-event=google.storage.object.finalize \
 --allow-unauthenticated 