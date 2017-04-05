class Product < ApplicationRecord
  has_many :baskets
  has_many :users, through: :baskets
end
