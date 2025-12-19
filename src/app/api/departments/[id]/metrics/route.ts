
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Department from '@/models/Department';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();

        const { id } = await params;
        const metrics = await request.json();

        // Basic validation
        if (!metrics) {
            return NextResponse.json(
                { message: 'Metrics data is required' },
                { status: 400 }
            );
        }

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { $set: { metrics: metrics } },
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            return NextResponse.json(
                { message: 'Department not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedDepartment);
    } catch (error: any) {
        console.error('Error updating metrics:', error);
        return NextResponse.json(
            { message: 'Error updating metrics', error: error.message },
            { status: 500 }
        );
    }
}
