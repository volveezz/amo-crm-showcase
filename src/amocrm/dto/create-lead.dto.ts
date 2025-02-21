import { ApiProperty } from '@nestjs/swagger';

class Tag {
  @ApiProperty({
    description: 'Tag ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Tag name',
    example: 'Important',
  })
  name: string;
}

class Source {
  @ApiProperty({
    description: 'Source of the lead',
    example: 'Web',
  })
  source: string;
}

class Contact {
  @ApiProperty({
    description: 'Contact ID',
    example: 123,
  })
  id: number;

  @ApiProperty({
    description: 'Contact name',
    example: 'John Doe',
  })
  name: string;
}

class Company {
  @ApiProperty({
    description: 'Company ID',
    example: 456,
  })
  id: number;

  @ApiProperty({
    description: 'Company name',
    example: 'Acme Corp.',
  })
  name: string;
}

class CustomField {
  @ApiProperty({
    description: 'Custom field ID',
    example: 789,
  })
  field_id: number;

  @ApiProperty({
    description: 'Custom field value',
    example: 'Custom value',
  })
  values: any;
}

export class CreateLeadDto {
  @ApiProperty({
    description: 'Lead name',
    example: 'New Lead',
  })
  name: string;

  @ApiProperty({
    description: 'Lead sale price',
    example: 10000,
  })
  price: number;

  @ApiProperty({
    description: 'Stage ID for the lead',
    example: 1,
  })
  status_id: number;

  @ApiProperty({
    description: 'Pipeline ID for the lead',
    example: 2,
  })
  pipeline_id: number;

  @ApiProperty({
    description: 'User ID who created the lead',
    example: 1,
  })
  created_by: number;

  @ApiProperty({
    description: 'User ID who updated the lead',
    example: 2,
  })
  updated_by: number;

  @ApiProperty({
    description: 'Lead creation date (Unix timestamp)',
    example: 1638324731,
  })
  created_at: number;

  @ApiProperty({
    description: 'Lead update date (Unix timestamp)',
    example: 1638324731,
  })
  updated_at: number;

  @ApiProperty({
    description: 'Lead closure date (Unix timestamp)',
    example: 1638324731,
  })
  closed_at: number;

  @ApiProperty({
    description: 'Lead loss reason ID',
    example: 3,
  })
  loss_reason_id: number;

  @ApiProperty({
    description: 'Responsible user ID for the lead',
    example: 5,
  })
  responsible_user_id: number;

  @ApiProperty({
    description: 'Custom fields associated with the lead',
    type: [CustomField],
    required: false,
  })
  custom_fields_values: CustomField[];

  @ApiProperty({
    description: 'Tags associated with the lead',
    type: [Tag],
    required: false,
  })
  tags: Tag[];

  @ApiProperty({
    description: 'Contacts attached to the lead',
    type: [Contact],
    required: false,
  })
  contacts: Contact[];

  @ApiProperty({
    description: 'Company attached to the lead',
    type: [Company],
    required: false,
  })
  companies: Company[];

  @ApiProperty({
    description: 'Source of the lead',
    type: Source,
    required: false,
  })
  source: Source;

  @ApiProperty({
    description: 'Tags to add to the lead',
    type: [Tag],
    required: false,
  })
  tags_to_add: Tag[];

  @ApiProperty({
    description: 'Tags to delete from the lead',
    type: [Tag],
    required: false,
  })
  tags_to_delete: Tag[];
}
