import { MockServiceBuilder } from './ServiceBuilder';
import { Table } from '../models/Table';

export const TableService = MockServiceBuilder.build<Table>('Table');
