I.Separation of Concerns:
  --Separation of Concerns is a "design principle" that suggests dividing a computer program into distinct sections, where each section addresses a separate concern.
  --Query type represents the entry points for fetching data.    
  --Company and Job are object types that define the structure of your data.

1.)Query type concern
--is concern with defining the "entry" points for data fetching operations
>>it specifies what data can be requested from the API. 
  
2.).Data Structure concern
>>The Company and Job types are concerned with defining the "structure and relationships" of the data itself. 
--they describe what fields are available for each entity


II.Reusability:
   --By defining Company as a separate type, it can be reused in multiple places within the schema, not just in queries.
        For example, 
        it's used as a field in the Job type (company: Company!).


III.Schema Organization:
    --This structure keeps the schema clean and organized, separating the definition of data types 
      from the definition of possible queries.

IV.Flexibility:
  --While Company isn't directly queryable in this schema, it could be added to the Query type later if needed, 
    without changing its definition.

V.GraphQL Best Practices:
  --It's a common practice in GraphQL to define object types separately and then use them in the Query type or other object types as needed.
 
 THIS IS IF WE AREB TO DECLARE QUERY FOR COMPANY
 type Query {
  jobs: [Job!]
  company(id: ID!): Company
  companies: [Company!]
}