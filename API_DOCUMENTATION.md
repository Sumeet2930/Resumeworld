# API Documentation

## Base URL
```
http://localhost:8000/api
```

---

## Endpoints

### 1. Analyze Resume

**Description:** Analyze a resume against a job description using AI

**HTTP Method:** `POST`

**Endpoint:** `/analyze`

**Request Headers:**
```http
Content-Type: multipart/form-data
```

**Request Body:**
```
job_description: (string, required)
  - The complete job description text
  - Plain text format
  - Required for accurate analysis

resume_file: (file, required)
  - PDF or plain text file format
  - Supported formats: .pdf, .txt
  - Maximum size: 10MB (configurable)
```

**Example Request (cURL):**
```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "job_description=Senior Python Developer with 5+ years experience..." \
  -F "resume_file=@resume.pdf"
```

**Example Request (JavaScript):**
```javascript
const formData = new FormData();
formData.append('job_description', jobDescriptionText);
formData.append('resume_file', fileInput.files[0]);

fetch('http://localhost:8000/api/analyze', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => console.log(data));
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "overall_score": 8,
    "skill_score": 9,
    "keyword_score": 7,
    "experience_score": 8,
    "ats_compatibility_score": 8,
    "matching_skills": [
      "Python",
      "FastAPI",
      "REST API",
      "React",
      "PostgreSQL"
    ],
    "missing_keywords": [
      "Docker",
      "Kubernetes",
      "GraphQL",
      "AWS"
    ],
    "missing_skills": [
      "DevOps",
      "Cloud Architecture",
      "Microservices"
    ],
    "strengths": [
      "Strong backend development experience",
      "Full-stack capabilities demonstrated",
      "Good project leadership experience",
      "Continuous learning and improvement"
    ],
    "weaknesses": [
      "Limited cloud/DevOps experience",
      "No infrastructure as code examples",
      "Limited leadership in large teams",
      "Few quantified metrics in resume"
    ],
    "improvement_suggestions": [
      "Add Docker and containerization experience or projects",
      "Highlight any cloud platform projects (AWS, GCP, Azure)",
      "Quantify performance improvements (e.g., '40% faster API')",
      "Include team leadership examples if available",
      "Add deployment and CI/CD pipeline experience",
      "Mention scalability improvements in past projects"
    ],
    "ats_issues": [],
    "optimized_resume": "JOHN DOE\n[Contact Information]\n\nPROFESSIONAL SUMMARY\nExperienced Full-Stack Developer with 6+ years of proven track record..."
  }
}
```

**Error Response (400):**
```json
{
  "detail": "Please enter a job description"
}
```

**Error Response (500):**
```json
{
  "detail": "Analysis failed: API rate limit exceeded"
}
```

**Response Fields Explained:**

| Field | Type | Description |
|-------|------|-------------|
| `overall_score` | Integer (0-10) | Overall resume match percentage |
| `skill_score` | Integer (0-10) | How well skills match |
| `keyword_score` | Integer (0-10) | Keyword matching from JD |
| `experience_score` | Integer (0-10) | Experience relevance |
| `ats_compatibility_score` | Integer (0-10) | ATS readability score |
| `matching_skills` | Array[String] | Skills from resume matching JD |
| `missing_keywords` | Array[String] | Important keywords to add |
| `missing_skills` | Array[String] | Required skills not in resume |
| `strengths` | Array[String] | Strong points of resume |
| `weaknesses` | Array[String] | Areas needing improvement |
| `improvement_suggestions` | Array[String] | Specific action items |
| `ats_issues` | Array[String] | ATS compatibility problems |
| `optimized_resume` | String | AI-generated optimized resume |

---

### 2. Download Optimized Resume

**Description:** Download the last generated optimized resume as PDF

**HTTP Method:** `GET`

**Endpoint:** `/download`

**Query Parameters:** None

**Example Request:**
```bash
curl -X GET http://localhost:8000/api/download \
  -H "Accept: application/pdf" \
  -o optimized_resume.pdf
```

**Example Request (JavaScript):**
```javascript
fetch('http://localhost:8000/api/download')
  .then(res => res.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized_resume.pdf';
    a.click();
  });
```

**Success Response (200):**
```
[Binary PDF file data]
Headers:
- Content-Type: application/pdf
- Content-Disposition: attachment; filename=optimized_resume.pdf
```

**Error Response (400):**
```json
{
  "detail": "No resume to download. Please analyze first."
}
```

**Error Response (500):**
```json
{
  "detail": "PDF generation failed: [error details]"
}
```

---

### 3. Health Check

**Description:** Verify API is running and healthy

**HTTP Method:** `GET`

**Endpoint:** `/health`

**Example Request:**
```bash
curl -X GET http://localhost:8000/api/health
```

**Response (200):**
```json
{
  "status": "healthy",
  "service": "AI Resume Analyzer"
}
```

---

## Resource Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| Resume File Size | 10 MB | Configurable |
| Job Description Length | 50,000 characters | Configurable |
| API Response Time | 60 seconds | ~30-60s typical |
| Concurrent Requests | Unlimited | Rate limiting can be added |

---

## Error Handling

All errors follow a standard format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request format and required fields |
| 404 | Not Found | Endpoint doesn't exist |
| 422 | Validation Error | Invalid file format or missing data |
| 500 | Server Error | Backend error, check logs |
| 503 | Service Unavailable | API key invalid or rate limited |

---

## Rate Limiting

Currently no rate limiting implemented. In production, consider adding:
- Per-IP rate limiting
- Per-user rate limiting (with authentication)
- Request queuing system

---

## Authentication (Future)

Future versions may implement:
- JWT tokens
- API key authentication
- OAuth 2.0

Currently, API is publicly accessible (CORS-protected).

---

## Performance Tips

1. **Optimize Resume File Size**
   - Compress images in resume
   - Use text-only format when possible
   - Keep file under 2MB

2. **Optimize Job Description**
   - Include only relevant content
   - Remove HTML formatting
   - Keep under 10,000 characters

3. **Batch Processing**
   - Consider server-side rate limiting for production
   - Implement request queuing

---

## Example Workflow

### Step 1: Analyze Resume
```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "job_description=@job_description.txt" \
  -F "resume_file=@resume.pdf"
```

Save the response for reference.

### Step 2: Download Optimized Resume
```bash
curl -X GET http://localhost:8000/api/download \
  -o my_optimized_resume.pdf
```

### Step 3: Use Downloaded Resume
- Review the optimized resume
- Customize further as needed
- Submit to applications

---

## Development

### Local Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new request
3. Method: POST
4. URL: `http://localhost:8000/api/analyze`
5. Body: form-data
   - Key: `job_description`, Value: [text]
   - Key: `resume_file`, Value: [file]
6. Send

### API Documentation UI

Access interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## Webhooks (Future)

Future versions may support:
- Webhook callbacks after analysis
- Async processing with status polling
- Email delivery of results

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | January 2025 | Initial release |

---

## Support

For API issues or questions:
1. Check this documentation
2. Review error messages and logs
3. Test with provided examples
4. Check GitHub issues

---

**Last Updated: January 2025**
