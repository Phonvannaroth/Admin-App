<<<<<<< HEAD
export interface Company {
    key?:string;
    name?:string;
    employees:string;
    email?:string;
    website:string;
    facebook:string;
    phone_number?:string;
    address_1?:string;
    address_2:string;
    date_create?:Date;
}

export interface PostJob{
    key?:string;
    company_key?:string;
    category_key?:string;
    jobtitle?:string;
    exp:number;
    hiring:number;
    salary:string;
    gender:string;
    age:string;
    postdate?:Date;
    expdate?:Date;
    term:string;
    industry:string;
    qualification:string;
    language:string;
    location?:string;
    requirement:string;
    description:string;
}
=======
export interface Companykey {
    key?: string;
    CName: string;
    email: string;
    website: string;
    facebook: string;
    address1: string;
    address2: string;
}
>>>>>>> fab476a46a603a366fac195513e30c3477e4b99e
