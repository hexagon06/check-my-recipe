import { Params } from "react-router-dom";
import { Contact } from "../types/contact";
import { getContact, getContacts } from "../contacts";

export type ContactLoaderData = { contact: Contact };

export async function contactLoader({
  params,
}: {
  params: Params<string>;
}): Promise<ContactLoaderData> {
  if (params.contactId === undefined) throw new Error("contactId is undefined");
  const contact = await getContact(params.contactId);
  return { contact };
}

export type ContactsLoaderData = { contacts: Contact[] };
export async function contactsLoader(): Promise<ContactsLoaderData> {
  const contacts = await getContacts();
  return { contacts };
}
