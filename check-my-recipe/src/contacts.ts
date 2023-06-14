import { Contact } from "./types/contact";

let contacts: Contact[] = [];

export async function getContacts(): Promise<Contact[]> {
  return Promise.resolve(contacts);
}

export async function createContact() {
  const contact: Contact = {
    favorite: false,
    first: "John",
    last: "Doe",
    id: `${contacts.length}`,
  };
  contacts = [...contacts, contact];
  return contact;
}

export async function getContact(contactId: string): Promise<Contact> {
  const contact = contacts.find((c) => c.id === contactId);
  if (contact === undefined) throw new Error("Contact not found");
  return Promise.resolve(contact);
}

export async function updateContact(
  contactId: string,
  updates: {
    [k: string]: FormDataEntryValue;
  }
) {
  const contact = contacts.find((c) => c.id === contactId);
  if (contact === undefined) throw new Error("Contact not found");

  const keys = Object.keys(updates);
  keys.forEach((key) => ((contact as any)[key] = updates[key]));
  return Promise.resolve();
}
