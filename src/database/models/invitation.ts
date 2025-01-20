import { Schema, model, Document } from 'mongoose';
import { IInvitation } from '../types';

const invitationSchema = new Schema<IInvitation>({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    material: [{ type: Schema.Types.ObjectId, required: true, ref: 'Material' }]
});

const Invitation = model<IInvitation>('Invitation', invitationSchema);

export default Invitation;