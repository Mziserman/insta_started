class User < ApplicationRecord
  has_many :baskets
  has_many :products, through: :baskets
  has_many :adresses

  def buy!(product_id, quantity)
    return false unless Product.find(product_id)
    if baskets.where(product_id: product_id).blank?
      baskets.create(product_id: product_id, quantity: quantity)
    else
      basket = baskets.where(product_id: product_id).first
      basket.update_attributes(quantity: basket.quantity + quantity)
    end
  end

  def basket
    baskets = self.baskets.each do |b|
      b.product = Product.find(b.product_id)

      puts b
    end

    puts baskets

  end
end
