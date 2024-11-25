using System;
using SnowflakeGenerator;

namespace ShopApi.Infra;

public static class IdGenerator
{
    static IdGenerator()
    {
        Settings settings = new Settings 
        { 
            MachineID = 1,
            CustomEpoch = new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero) 
        };

        snowflake = new Snowflake(settings);
    }

    public static long GetId()
    {
        return snowflake.NextID();
    }

    private static readonly Snowflake snowflake;
}
