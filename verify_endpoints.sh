#!/bin/bash

BASE_URL="http://localhost:3000"

echo "1. Health Check"
curl -s $BASE_URL/health | grep "API works fine"

echo -e "\n2. Signup"
SIGNUP_RES=$(curl -s -X POST $BASE_URL/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}')
echo $SIGNUP_RES

echo -e "\n3. Login"
LOGIN_RES=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}')
TOKEN=$(echo $LOGIN_RES | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')
echo "Token obtained: ${TOKEN:0:10}..."

if [ -z "$TOKEN" ]; then
  echo "Failed to get token"
  exit 1
fi

echo -e "\n4. Search (Normal)"
curl -s "$BASE_URL/search?q=typescript" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n5. Search (Incognito)"
curl -s "$BASE_URL/search?q=secret&incognito=true" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n6. Check History"
curl -s "$BASE_URL/search/history" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n7. Create Pinned Website"
curl -s -X POST "$BASE_URL/pinned" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Google", "url":"https://google.com"}'

echo -e "\n8. Get Pinned Websites"
curl -s "$BASE_URL/pinned" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n9. Create Folder"
curl -s -X POST "$BASE_URL/bookmarks/folders" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Work"}'

echo -e "\n10. Create Bookmark in Folder"
curl -s -X POST "$BASE_URL/bookmarks" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"GitHub", "url":"https://github.com", "folder_name":"Work", "tags":"code,dev"}'

echo -e "\n11. Get Bookmarks"
curl -s "$BASE_URL/bookmarks" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n12. Search Bookmarks"
curl -s "$BASE_URL/bookmarks?q=git" \
  -H "Authorization: Bearer $TOKEN"
