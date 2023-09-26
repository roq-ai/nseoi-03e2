-- CreateTable
CREATE TABLE "administrator" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "option_type" VARCHAR(255) NOT NULL,
    "strike_price" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(6) NOT NULL,
    "client_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option_chain_analysis" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "strike_price" DOUBLE PRECISION NOT NULL,
    "expiry_date" TIMESTAMP(6) NOT NULL,
    "option_type" VARCHAR(255),
    "last_traded_price" DOUBLE PRECISION,
    "volume_traded_today" INTEGER,
    "open_interest" INTEGER,
    "implied_volatility" DOUBLE PRECISION,
    "change_in_open_interest" INTEGER,
    "previous_day_volume" INTEGER,
    "historical_volatility" DOUBLE PRECISION,
    "delta" DOUBLE PRECISION,
    "greeks" VARCHAR(255),
    "theta" DOUBLE PRECISION,
    "vega" DOUBLE PRECISION,
    "option_chain_timestamp" TIMESTAMP(6) NOT NULL,
    "underlying_asset" VARCHAR(255),
    "option_chain_analysis" TEXT,
    "analysis_timestamp" TIMESTAMP(6),
    "option_chain_trend" VARCHAR(255),
    "option_chain_sentiment" VARCHAR(255),
    "analysis_summary" TEXT,
    "analysis_accuracy" DOUBLE PRECISION,
    "analysis_confidence_interval" DOUBLE PRECISION,
    "analysis_comments" TEXT,
    "analysis_update_frequency" VARCHAR(255),
    "option_chain_prediction" DOUBLE PRECISION,

    CONSTRAINT "option_chain_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "administrator" ADD CONSTRAINT "administrator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "owner" ADD CONSTRAINT "owner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

