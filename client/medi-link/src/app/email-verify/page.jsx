export default function EmailVerifyPage() {
    return (
        <div className="bg-background min-h-screen flex items-center justify-center p-4">
            <h1 className="text-2xl font-bold">Email Verification</h1>
            <p className="mt-2">Please enter the OTP sent to your email.</p>
            <form className="mt-4">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="border p-2 rounded"
                />
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-lg mt-4">
                    Verify
                </button>
            </form>
        </div>
    );
}