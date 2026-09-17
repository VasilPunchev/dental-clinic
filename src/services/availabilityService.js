export  async function getAvailableHours(date,{signal} = {}) {
    if (!date) {
        return [];
    }
    const searchParams = new URLSearchParams({date});
    
    const response = await fetch (
        `/api/available-hours?${searchParams}`,
        { signal }
    );
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.error || "Свободните часове не могат да бъдат заредени.");
        
    }
    return result.availableHours || [];
}
 