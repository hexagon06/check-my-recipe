
import { QueryConstraint } from 'firebase/firestore'
import { firebaseClient } from './firebaseClient'
import { FirestoreAcces } from './firestoreAccess'
import { IdItem, Reference } from '../types'

export type TReference<T> = T & Reference

export interface ApiFor<T> {
  get(id: string): Promise<TReference<T> | undefined>
  query(...constraint: QueryConstraint[]): Promise<TReference<T>[]>
  create(creature: (IdItem & T)): Promise<string>
  delete(creature: TReference<T>): Promise<void>
  update(creature: TReference<T>): Promise<void>
  list(): Promise<TReference<T>[]>
}

export class Api<T> implements ApiFor<T> {

  constructor(private collection: string) {
  }

  async get(id: string): Promise<TReference<T> | undefined> {
    try {
      const firestore = new FirestoreAcces<TReference<T>>(firebaseClient.store, this.collection)

      return await firestore.getById(id)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to get ${id} in ${this.collection}`)
    }
  }

  async query(...constraint: QueryConstraint[]): Promise<TReference<T>[]> {
    try {
      const firestore = new FirestoreAcces<TReference<T>>(firebaseClient.store, this.collection)
      return await firestore.query(...constraint)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to query on ${this.collection}`)
    }
  }

  async create(entity: IdItem & T): Promise<string> {
    try {
      const firestore = new FirestoreAcces<IdItem & T>(firebaseClient.store, this.collection)

      return await firestore.add(entity)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to create in ${this.collection}`)
    }
  }

  async delete(entity: TReference<T>): Promise<void> {
    try {
      const firestore = new FirestoreAcces<TReference<T>>(firebaseClient.store, this.collection)
      await firestore.delete(entity)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to delete ${entity.id} in ${this.collection}`)
    }
  }

  async update(entity: TReference<T>): Promise<void> {
    try {
      const firestore = new FirestoreAcces<TReference<T>>(firebaseClient.store, this.collection)
      await firestore.update(entity)
    } catch (e) {
      console.error(e)
      throw new Error(`failed to update ${entity.id} in ${this.collection}`)
    }
  }


  async list(): Promise<TReference<T>[]> {
    try {
      const firestore = new FirestoreAcces<TReference<T>>(firebaseClient.store, this.collection)

      return await firestore.get()
    } catch (e) {
      console.error(e)
      throw new Error(`failed to getAll in ${this.collection}`)
    }
  }

  public childOf<C extends IdItem>(id: string, childPath: string) {
    return new Api<C>(`${this.collection}/${id}/${childPath}`)
  }
}
