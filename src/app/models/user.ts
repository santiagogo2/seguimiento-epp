export class User{
	constructor(
		public id: number,
		public user_alias: string,
		public user_type: number,
		public password: string,
		public name: string,
		public surname: string,
		public role: string
	){}
}