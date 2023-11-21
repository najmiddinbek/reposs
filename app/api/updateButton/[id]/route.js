import dbConnect from '../../../../lib/mongodb';
import Model from '../../../../models/topic';
export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'PATCH':
            try {
                const updatedRecord = await Model.findByIdAndUpdate(
                    id,
                    { status: req.body.status },
                    { new: true } // Return the updated record
                );

                if (!updatedRecord) {
                    return res
                        .status(404)
                        .json({ success: false, message: 'Record not found' });
                }

                res.status(200).json({ success: true, data: updatedRecord });
            } catch (error) {
                console.error('Error updating status:', error);
                res.status(500).json({ success: false, message: 'Server error' });
            }
            break;

        default:
            res.status(405).json({ success: false, message: 'Method Not Allowed' });
            break;
    }
}
