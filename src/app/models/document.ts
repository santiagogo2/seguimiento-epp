export class Document{
	constructor(
		public id: number,
		public name: string,
		public document_name: string,
		public user_id: number,
		public folder_id: number
	){}
}