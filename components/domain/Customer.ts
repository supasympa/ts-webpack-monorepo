export interface Person {
    firstName: string;
    lastName: string;
    email: string;
}

export class Customer implements Person {
    public static from(person: Person): Customer {
        return new Customer(
            person.firstName,
            person.lastName,
            person.email,
        );
    }
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
    ) {
    }

    public fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
