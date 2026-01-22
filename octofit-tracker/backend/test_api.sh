#!/bin/bash
# Test script for OctoFit Tracker API endpoints

echo "==========================================="
echo "OctoFit Tracker API Endpoint Tests"
echo "==========================================="
echo ""

# Get the codespace name
CODESPACE_NAME="${CODESPACE_NAME}"
if [ -z "$CODESPACE_NAME" ]; then
    echo "Running in local environment"
    BASE_URL="http://localhost:8000"
else
    echo "Running in GitHub Codespace: $CODESPACE_NAME"
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
fi

echo "Base URL: $BASE_URL"
echo ""

# Test each API endpoint
endpoints=("activities" "users" "teams" "workouts" "leaderboard")

for endpoint in "${endpoints[@]}"; do
    echo "Testing /api/${endpoint}/"
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" "${BASE_URL}/api/${endpoint}/")
    http_status=$(echo "$response" | grep "HTTP_STATUS" | cut -d: -f2)
    body=$(echo "$response" | sed '/HTTP_STATUS/d')
    
    echo "  Status: $http_status"
    if [ "$http_status" = "200" ]; then
        echo "  ✓ Success"
        # Pretty print first item if array is not empty
        if [ "$body" != "[]" ]; then
            echo "$body" | python3 -m json.tool | head -20
        else
            echo "  Response: []"
        fi
    else
        echo "  ✗ Failed"
        echo "  Response: $body"
    fi
    echo ""
done

echo "==========================================="
echo "Tests Complete"
echo "==========================================="
