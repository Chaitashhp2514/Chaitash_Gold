#!/usr/bin/env python3
"""
Backend API Testing for Chaitash Portfolio
Tests all API endpoints according to the review request specifications.
"""

import requests
import json
import time
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://dev-spotlight-138.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*60}")
    print(f"Testing: {test_name}")
    print(f"{'='*60}")

def print_result(endpoint, method, status_code, response_data, expected_status=200):
    print(f"\n{method} {endpoint}")
    print(f"Status: {status_code} (Expected: {expected_status})")
    print(f"Response: {json.dumps(response_data, indent=2, default=str)}")
    
    if status_code == expected_status:
        print("✅ PASS")
    else:
        print("❌ FAIL")
    return status_code == expected_status

def test_root_endpoint():
    """Test 1: GET /api/ → should return 200 with a message field"""
    print_test_header("Root Endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/")
        data = response.json()
        
        success = print_result("/", "GET", response.status_code, data, 200)
        
        if success and "message" in data:
            print("✅ Message field present")
            return True
        elif success:
            print("❌ Missing 'message' field in response")
            return False
        else:
            return False
            
    except Exception as e:
        print(f"❌ Exception occurred: {e}")
        return False

def test_contact_post_valid():
    """Test 2a: POST /api/contact with valid data"""
    print_test_header("Contact POST - Valid Cases")
    
    valid_payloads = [
        {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techcorp.com",
            "message": "Hi Chaitash, I'm impressed by your portfolio and would love to discuss potential collaboration opportunities. Your work on full-stack applications really stands out."
        },
        {
            "name": "Michael Chen",
            "email": "m.chen@startupventures.io",
            "message": "Hello! I came across your portfolio and I'm interested in discussing a senior developer position at our company. Would you be available for a brief call this week?"
        },
        {
            "name": "Dr. Emily Rodriguez",
            "email": "emily.rodriguez@university.edu",
            "message": "Dear Chaitash, I'm reaching out regarding a research collaboration opportunity in AI and web development. Your background seems like a perfect fit for our project."
        }
    ]
    
    posted_messages = []
    all_success = True
    
    for i, payload in enumerate(valid_payloads, 1):
        try:
            print(f"\n--- Valid Test Case {i} ---")
            response = requests.post(f"{BASE_URL}/contact", json=payload)
            data = response.json()
            
            success = print_result("/contact", "POST", response.status_code, data, 200)
            
            if success:
                # Check required fields in response
                required_fields = ["id", "ok", "created_at"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields and data.get("ok") is True:
                    print("✅ All required fields present and ok=True")
                    posted_messages.append({
                        "id": data["id"],
                        "payload": payload,
                        "created_at": data["created_at"]
                    })
                else:
                    print(f"❌ Missing fields: {missing_fields} or ok != True")
                    all_success = False
            else:
                all_success = False
                
        except Exception as e:
            print(f"❌ Exception occurred: {e}")
            all_success = False
    
    return all_success, posted_messages

def test_contact_post_invalid():
    """Test 2b: POST /api/contact with invalid data"""
    print_test_header("Contact POST - Invalid Cases")
    
    invalid_payloads = [
        {
            "name": "",  # Empty name
            "email": "valid@email.com",
            "message": "This should fail due to empty name"
        },
        {
            "name": "John Doe",
            "email": "invalid-email",  # Invalid email format
            "message": "This should fail due to invalid email"
        },
        {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "message": ""  # Empty message
        },
        {
            "email": "missing@name.com",  # Missing name field
            "message": "This should fail due to missing name"
        }
    ]
    
    all_success = True
    
    for i, payload in enumerate(invalid_payloads, 1):
        try:
            print(f"\n--- Invalid Test Case {i} ---")
            response = requests.post(f"{BASE_URL}/contact", json=payload)
            
            try:
                data = response.json()
            except:
                data = {"error": "Could not parse JSON response"}
            
            success = print_result("/contact", "POST", response.status_code, data, 422)
            
            if not success:
                all_success = False
                
        except Exception as e:
            print(f"❌ Exception occurred: {e}")
            all_success = False
    
    return all_success

def test_contact_get(expected_count=0):
    """Test 3: GET /api/contact → must return array sorted newest first"""
    print_test_header("Contact GET - List Messages")
    
    try:
        response = requests.get(f"{BASE_URL}/contact")
        data = response.json()
        
        success = print_result("/contact", "GET", response.status_code, data, 200)
        
        if success:
            if isinstance(data, list):
                print(f"✅ Response is an array with {len(data)} messages")
                
                if len(data) >= expected_count:
                    print(f"✅ Contains at least {expected_count} expected messages")
                    
                    # Check if sorted newest first (if we have multiple messages)
                    if len(data) > 1:
                        dates = [msg.get("created_at") for msg in data if "created_at" in msg]
                        if dates == sorted(dates, reverse=True):
                            print("✅ Messages sorted newest first")
                        else:
                            print("❌ Messages not sorted newest first")
                            return False
                    
                    return True
                else:
                    print(f"❌ Expected at least {expected_count} messages, got {len(data)}")
                    return False
            else:
                print("❌ Response is not an array")
                return False
        else:
            return False
            
    except Exception as e:
        print(f"❌ Exception occurred: {e}")
        return False

def test_stats_visit():
    """Test 4: POST /api/stats/visit three times → visits should increase"""
    print_test_header("Stats Visit Counter")
    
    visit_counts = []
    all_success = True
    
    for i in range(3):
        try:
            print(f"\n--- Visit Call {i+1} ---")
            response = requests.post(f"{BASE_URL}/stats/visit", json={})
            data = response.json()
            
            success = print_result("/stats/visit", "POST", response.status_code, data, 200)
            
            if success and "visits" in data:
                visits = data["visits"]
                visit_counts.append(visits)
                print(f"✅ Visits count: {visits}")
                
                # Check if count increased (except for first call)
                if i > 0 and visits <= visit_counts[i-1]:
                    print(f"❌ Visits did not increase: {visit_counts[i-1]} -> {visits}")
                    all_success = False
                elif i > 0:
                    print(f"✅ Visits increased: {visit_counts[i-1]} -> {visits}")
            else:
                print("❌ Missing 'visits' field in response")
                all_success = False
                
        except Exception as e:
            print(f"❌ Exception occurred: {e}")
            all_success = False
    
    return all_success, visit_counts[-1] if visit_counts else 0

def test_stats_download():
    """Test 5: POST /api/stats/resume-download three times → downloads should increase"""
    print_test_header("Stats Download Counter")
    
    download_counts = []
    all_success = True
    
    for i in range(3):
        try:
            print(f"\n--- Download Call {i+1} ---")
            response = requests.post(f"{BASE_URL}/stats/resume-download", json={})
            data = response.json()
            
            success = print_result("/stats/resume-download", "POST", response.status_code, data, 200)
            
            if success and "downloads" in data:
                downloads = data["downloads"]
                download_counts.append(downloads)
                print(f"✅ Downloads count: {downloads}")
                
                # Check if count increased (except for first call)
                if i > 0 and downloads <= download_counts[i-1]:
                    print(f"❌ Downloads did not increase: {download_counts[i-1]} -> {downloads}")
                    all_success = False
                elif i > 0:
                    print(f"✅ Downloads increased: {download_counts[i-1]} -> {downloads}")
            else:
                print("❌ Missing 'downloads' field in response")
                all_success = False
                
        except Exception as e:
            print(f"❌ Exception occurred: {e}")
            all_success = False
    
    return all_success, download_counts[-1] if download_counts else 0

def test_stats_get(expected_visits, expected_downloads, expected_messages):
    """Test 6: GET /api/stats → returns {visits, downloads, messages}"""
    print_test_header("Stats Aggregate")
    
    try:
        response = requests.get(f"{BASE_URL}/stats")
        data = response.json()
        
        success = print_result("/stats", "GET", response.status_code, data, 200)
        
        if success:
            required_fields = ["visits", "downloads", "messages"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if not missing_fields:
                print("✅ All required fields present")
                
                visits = data["visits"]
                downloads = data["downloads"]
                messages = data["messages"]
                
                print(f"Current stats - Visits: {visits}, Downloads: {downloads}, Messages: {messages}")
                print(f"Expected minimums - Visits: >={expected_visits}, Downloads: >={expected_downloads}, Messages: >={expected_messages}")
                
                checks_passed = 0
                
                if visits >= expected_visits:
                    print(f"✅ Visits check passed: {visits} >= {expected_visits}")
                    checks_passed += 1
                else:
                    print(f"❌ Visits check failed: {visits} < {expected_visits}")
                
                if downloads >= expected_downloads:
                    print(f"✅ Downloads check passed: {downloads} >= {expected_downloads}")
                    checks_passed += 1
                else:
                    print(f"❌ Downloads check failed: {downloads} < {expected_downloads}")
                
                if messages >= expected_messages:
                    print(f"✅ Messages check passed: {messages} >= {expected_messages}")
                    checks_passed += 1
                else:
                    print(f"❌ Messages check failed: {messages} < {expected_messages}")
                
                return checks_passed == 3
            else:
                print(f"❌ Missing fields: {missing_fields}")
                return False
        else:
            return False
            
    except Exception as e:
        print(f"❌ Exception occurred: {e}")
        return False

def main():
    """Run all backend API tests"""
    print("🚀 Starting Backend API Tests for Chaitash Portfolio")
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now()}")
    
    results = {}
    
    # Test 1: Root endpoint
    results["root"] = test_root_endpoint()
    
    # Test 2a: Valid contact posts
    results["contact_post_valid"], posted_messages = test_contact_post_valid()
    
    # Test 2b: Invalid contact posts
    results["contact_post_invalid"] = test_contact_post_invalid()
    
    # Test 3: Get contacts (expect at least the 3 we just posted)
    results["contact_get"] = test_contact_get(expected_count=3)
    
    # Test 4: Visit counter
    results["stats_visit"], final_visits = test_stats_visit()
    
    # Test 5: Download counter
    results["stats_download"], final_downloads = test_stats_download()
    
    # Test 6: Aggregate stats
    results["stats_get"] = test_stats_get(final_visits, final_downloads, 3)
    
    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    
    total_tests = len(results)
    passed_tests = sum(1 for result in results.values() if result)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed!")
        return True
    else:
        print("⚠️  Some tests failed - see details above")
        return False

if __name__ == "__main__":
    main()