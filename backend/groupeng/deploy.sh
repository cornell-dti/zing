#!/bin/bash

gcloud functions deploy subscribe \
 --trigger-topic groupeng \
 --runtime python38 
