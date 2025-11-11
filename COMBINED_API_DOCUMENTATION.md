# Combined Content Creation API

## Overview
This is a new combined API that allows you to create pages, sections, and content blocks using a single endpoint. The API maintains the same response structure as the individual APIs.

## Endpoint
```
POST /api/v1/content/create
```

## Request Structure

### Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "type": "page" | "section" | "content_block",
  "data": {
    // Data object based on the type
  }
}
```

## Usage Examples

### 1. Create Page
```json
{
  "type": "page",
  "data": {
    "slug": "about-us",
    "title": "About Us",
    "meta_title": "About Us - Company Name",
    "meta_description": "Learn more about our company",
    "meta_keywords": "about, company, information",
    "page_type": "custom",
    "is_active": true,
    "is_published": false,
    "published_at": null,
    "created_by": 1
  }
}
```

### 2. Create Section
```json
{
  "type": "section",
  "data": {
    "name": "Hero Section",
    "title": "Welcome to Our Website",
    "section_type": "hero",
    "display_order": 1,
    "page_id": 1
  }
}
```

### 3. Create Content Block
```json
{
  "type": "content_block",
  "data": {
    "section_id": 1,
    "block_type": "text",
    "title": "Main Heading",
    "content": "This is the main content",
    "subtitle": "Subtitle text",
    "description": "Description text",
    "display_order": 1,
    "alignment": "center",
    "width_percentage": 100,
    "status": true
  }
}
```

## Response Structure

### Success Response
```json
{
  "status": 1,
  "message": "Created successfully",
  "data": {
    // Returns the created entity data based on type
    // Same structure as individual APIs
  }
}
```

### Error Response
```json
{
  "status": 0,
  "message": "Error message"
}
```

## Validation Rules

### For Page Creation
- `slug` (required): Unique page slug
- `title` (required): Page title
- `meta_title` (optional): SEO meta title
- `meta_description` (optional): SEO meta description
- `meta_keywords` (optional): SEO meta keywords
- `page_type` (optional): Default "custom"
- `is_active` (optional): Default true
- `is_published` (optional): Default false
- `created_by` (required): User ID who created the page

### For Section Creation
- `name` (required): Section name
- `title` (optional): Section title
- `section_type` (required): Type of section (hero, testimonials, statistics, etc.)
- `display_order` (optional): Display order, default 0
- `page_id` (required): ID of the page this section belongs to

### For Content Block Creation
- `section_id` (required): ID of the section this content block belongs to
- `block_type` (required): Type of content block (text, image, video, etc.)
- `title` (optional): Content block title
- `content` (optional): Main content
- `subtitle` (optional): Subtitle text
- `description` (optional): Description text
- `display_order` (required): Display order
- `alignment` (optional): Text alignment (left, center, right)
- `width_percentage` (optional): Width percentage, default 100
- `status` (optional): Active status, default true

## Error Handling

The API will return appropriate error messages for:
- Missing required fields
- Invalid type values
- Database constraint violations
- Validation errors

## Benefits

1. **Single Endpoint**: One API to handle all three creation operations
2. **Consistent Response**: Same response structure as individual APIs
3. **Reduced Complexity**: Frontend only needs to call one endpoint
4. **Maintainable**: Single controller and model function
5. **Backward Compatible**: Existing APIs remain unchanged

## Notes

- This is a new API that doesn't modify any existing functionality
- All existing APIs continue to work as before
- The response structure matches the individual APIs exactly
- Type validation ensures only valid content types are processed
