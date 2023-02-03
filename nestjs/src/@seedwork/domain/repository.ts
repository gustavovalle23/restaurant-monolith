export interface Repository<Entity, Identifier> {
    create(input: any): Entity | Promise<Entity>
    findById(id: Identifier): Entity | Promise<Entity>
    findAll(): Entity[] | Promise<Entity[]>
    remove(id: Identifier): Promise<void>;

}
