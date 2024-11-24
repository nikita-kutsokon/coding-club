export interface ControllerDocumentationSchema {
    tag: string;
    description: string;
    operations: {
        method: string;
        summary: string;
        responses: Record<number, { status: number; description: string; content?: any }>;
    }[];
}
