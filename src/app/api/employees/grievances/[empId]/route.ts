
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Grievance from '@/models/Grievance';
import User from '@/models/User'; // Ensure User model is registered

export async function GET(
    request: Request,
    { params }: { params: Promise<{ empId: string }> }
) {
    try {
        await dbConnect();

        const { empId } = await params;

        // Find grievances addressed to this employee
        const grievances = await Grievance.find({ addressedTo: empId })
            .populate('raisedBy', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json(grievances);
    } catch (error: any) {
        console.error('Error fetching employee grievances:', error);
        return NextResponse.json(
            { message: 'Error fetching employee grievances', error: error.message },
            { status: 500 }
        );
    }
}
