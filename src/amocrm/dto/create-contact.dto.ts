import { ApiProperty } from '@nestjs/swagger';

class Tag {
  @ApiProperty({
    description: 'Tag ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Tag name',
    example: 'VIP',
  })
  name: string;
}

class CustomField {
  @ApiProperty({
    description: 'Custom field ID',
    example: 101,
  })
  field_id: number;

  @ApiProperty({
    description: 'Custom field value',
    example: 'Custom Value',
  })
  values: any;
}

export class CreateContactDto {
  @ApiProperty({
    description: 'Contact fullname',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Contact first name',
    example: 'John',
  })
  first_name: string;

  @ApiProperty({
    description: 'Contact last name',
    example: 'Doe',
  })
  last_name: string;

  @ApiProperty({
    description: 'Responsible user ID for the contact',
    example: 1,
  })
  responsible_user_id: number;

  @ApiProperty({
    description: 'ID of the user who created the contact',
    example: 1,
  })
  created_by: number;

  @ApiProperty({
    description: 'ID of the user who updated the contact last',
    example: 2,
  })
  updated_by: number;

  @ApiProperty({
    description: 'Contact creation date (Unix timestamp)',
    example: 1638324731,
  })
  created_at: number;

  @ApiProperty({
    description: 'Contact update date (Unix timestamp)',
    example: 1638324731,
  })
  updated_at: number;

  @ApiProperty({
    description: 'Array of custom field values associated with the contact',
    type: [CustomField],
    required: false,
  })
  custom_fields_values: CustomField[];

  @ApiProperty({
    description: 'Tags associated with the contact',
    type: [Tag],
    required: false,
  })
  tags: Tag[];

  @ApiProperty({
    description: 'Array of tags to add to the contact',
    type: [Tag],
    required: false,
  })
  tags_to_add: Tag[];

  @ApiProperty({
    description: 'Array of tags to delete from the contact',
    type: [Tag],
    required: false,
  })
  tags_to_delete: Tag[];
}
