export interface Repository<Entity, Identifier> {
    create(input: any): Entity | Promise<Entity>
    findById(id: Identifier): Entity | Promise<Entity>
    findAll(pagination: Pagination): Entity[] | Promise<Entity[]>
    remove(id: Identifier): Promise<void>;
}

type Pagination = { limit: number, skip: number }
