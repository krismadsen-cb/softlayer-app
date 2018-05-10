#!/bin/sh

$(which python) /opt/inventory/get_sl_inventory.py \
                          --sluser $1 \
                          --sltoken $2 \
