import INTAKE_CREATION_OPERATION_DOC from './operation-documentation/create-record.operation-doc';
import INTAKE_UPDATE_OPERATION_DOC from './operation-documentation/update-record-by-id.operation-doc';
import INTAKE_DELETION_OPERATION_DOC from './operation-documentation/delete-record-by-id.operation-doc';
import INTAKE_RETRIEVAL_OPERATION_DOC from './operation-documentation/retrieve-record-by-id.operation-doc';
import INTAKES_LIST_RETRIEVAL_OPERATION_DOC from './operation-documentation/retrieve-records-list.operation-doc';

export const INTAKES_CONTROLLER_DOCUMENTATION = {
    tag: 'Intakes',
    description: 'Handles intake-related actions including creation, updating, deletion, retrieval by ID, and listing of intakes',
    operations: [INTAKE_CREATION_OPERATION_DOC, INTAKE_UPDATE_OPERATION_DOC, INTAKE_DELETION_OPERATION_DOC, INTAKE_RETRIEVAL_OPERATION_DOC, INTAKES_LIST_RETRIEVAL_OPERATION_DOC],
};
