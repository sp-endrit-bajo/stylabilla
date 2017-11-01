#!/usr/bin/env bash

bucket=$1

[[ -z $bucket ]] && echo 'Bucket url required' && exit 1

s3-deploy \
    './dist/**' \
    --cwd './dist/' \
    --region eu-west-1 \
    --bucket $bucket \
    --gzip \
    --cache 120 \
    --etag

s3-deploy \
    './dist-docs/**' \
    --cwd './dist-docs/' \
    --region eu-west-1 \
    --bucket $bucket/docs \
    --gzip \
    --cache 120 \
    --etag
