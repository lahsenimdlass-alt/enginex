"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Trash2, Eye, Users, FileText, TrendingUp, Clock } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { supabase, type Listing, type Profile } from "../lib/supabase"
import { useToast } from "@/hooks/use-toast"

type AdminDashboardPageProps = {
  onNavigate: (page: string, params?: any) => void
}

export function AdminDashboardPage({ onNavigate }: AdminDashboardPageProps) {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [listings, setListings] = useState<Listing[]>([])
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingListingId, setLoadingListingId] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    pendingListings: 0,
    approvedListings: 0,
    totalViews: 0,
  })
  const [activeTab, setActiveTab] = useState<"pending" | "all" | "users">("pending")

  useEffect(() => {
    if (!user || !profile?.is_admin) {
      onNavigate("home")
      return
    }
    loadDashboardData()
  }, [user, profile])

  const loadDashboardData = async () => {
    setLoading(true)

    const [listingsData, usersData] = await Promise.all([
      supabase.from("listings").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    ])

    if (listingsData.data) {
      setListings(listingsData.data)
      setStats({
        totalUsers: usersData.data?.length || 0,
        totalListings: listingsData.data.length,
        pendingListings: listingsData.data.filter((l) => l.status === "pending").length,
        approvedListings: listingsData.data.filter((l) => l.status === "approved").length,
        totalViews: listingsData.data.reduce((sum, l) => sum + (l.views_count || 0), 0),
      })
    }

    if (usersData.data) {
      setUsers(usersData.data)
    }

    setLoading(false)
  }

  const approveListing = async (listingId: string) => {
    setLoadingListingId(listingId)
    try {
      const response = await supabase.from("listings").update({ status: "approved" }).eq("id", listingId)

      if (response.error) {
        toast({
          title: "Erreur",
          description: `Impossible d'approuver l'annonce: ${response.error.message || "Erreur inconnue"}`,
          variant: "destructive",
        })
        console.error("[v0] Approve error:", response.error)
      } else {
        toast({
          title: "Succès",
          description: "L'annonce a été approuvée avec succès",
        })
        await loadDashboardData()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue s'est produite"
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("[v0] Approve exception:", err)
    } finally {
      setLoadingListingId(null)
    }
  }

  const rejectListing = async (listingId: string) => {
    setLoadingListingId(listingId)
    try {
      const response = await supabase.from("listings").update({ status: "rejected" }).eq("id", listingId)

      if (response.error) {
        toast({
          title: "Erreur",
          description: `Impossible de rejeter l'annonce: ${response.error.message || "Erreur inconnue"}`,
          variant: "destructive",
        })
        console.error("[v0] Reject error:", response.error)
      } else {
        toast({
          title: "Succès",
          description: "L'annonce a été rejetée",
        })
        await loadDashboardData()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue s'est produite"
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("[v0] Reject exception:", err)
    } finally {
      setLoadingListingId(null)
    }
  }

  const deleteListing = async (listingId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) return

    setLoadingListingId(listingId)
    try {
      const response = await supabase.from("listings").delete().eq("id", listingId)

      if (response.error) {
        toast({
          title: "Erreur",
          description: `Impossible de supprimer l'annonce: ${response.error.message || "Erreur inconnue"}`,
          variant: "destructive",
        })
        console.error("[v0] Delete error:", response.error)
      } else {
        toast({
          title: "Succès",
          description: "L'annonce a été supprimée",
        })
        await loadDashboardData()
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue s'est produite"
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
      console.error("[v0] Delete exception:", err)
    } finally {
      setLoadingListingId(null)
    }
  }

  if (!profile?.is_admin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
        <p className="text-gray-600">Cette page est réservée aux administrateurs.</p>
      </div>
    )
  }

  const pendingListings = listings.filter((l) => l.status === "pending")
  const displayedListings = activeTab === "pending" ? pendingListings : listings

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Tableau de bord administrateur</h1>
        <p className="text-gray-600">
          Bienvenue, <strong>{profile?.full_name}</strong> - Contrôle total de la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.totalUsers}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Utilisateurs</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="h-10 w-10 text-[#156D3E]" />
            <span className="text-3xl font-bold text-gray-900">{stats.totalListings}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Total annonces</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-10 w-10 text-orange-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.pendingListings}</span>
          </div>
          <h3 className="text-gray-600 font-medium">En attente</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.approvedListings}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Approuvées</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-10 w-10 text-purple-600" />
            <span className="text-3xl font-bold text-gray-900">{stats.totalViews}</span>
          </div>
          <h3 className="text-gray-600 font-medium">Vues totales</h3>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 px-6 py-4">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === "pending" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              En attente ({stats.pendingListings})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === "all" ? "bg-[#156D3E] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Toutes les annonces
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium rounded-md transition-colors ${
                activeTab === "users" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Utilisateurs ({stats.totalUsers})
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Chargement...</p>
            </div>
          ) : activeTab === "users" ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.full_name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.phone && <p className="text-sm text-gray-600">📱 {user.phone}</p>}
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            user.account_type === "premium"
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                              : user.account_type === "pro"
                                ? "bg-[#156D3E] text-white"
                                : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {user.account_type.toUpperCase()}
                        </span>
                        {user.is_admin && (
                          <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
                            ADMIN
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>Inscrit le</p>
                      <p>{new Date(user.created_at).toLocaleDateString("fr-MA")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {displayedListings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {activeTab === "pending" ? "Aucune annonce en attente" : "Aucune annonce trouvée"}
                  </p>
                </div>
              ) : (
                displayedListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0] || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Pas d'image
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
                            <p className="text-sm text-gray-600">
                              {listing.region} - {listing.city}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#156D3E]">{listing.price.toLocaleString()} MAD</p>
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                listing.status === "pending"
                                  ? "bg-orange-100 text-orange-700"
                                  : listing.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {listing.status === "pending"
                                ? "EN ATTENTE"
                                : listing.status === "approved"
                                  ? "APPROUVÉE"
                                  : "REJETÉE"}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{listing.description}</p>

                        {listing.contact_phone && (
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Téléphone :</strong> {listing.contact_phone}
                          </p>
                        )}

                        {listing.contact_email && (
                          <p className="text-sm text-gray-700 mb-3">
                            <strong>Email :</strong> {listing.contact_email}
                          </p>
                        )}

                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => onNavigate("listing-detail", { id: listing.id })}
                            disabled={loadingListingId === listing.id}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Eye className="h-4 w-4" />
                            Voir
                          </button>

                          {listing.status === "pending" && (
                            <>
                              <button
                                onClick={() => approveListing(listing.id)}
                                disabled={loadingListingId !== null}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <CheckCircle className="h-4 w-4" />
                                {loadingListingId === listing.id ? "Approbation..." : "Approuver"}
                              </button>
                              <button
                                onClick={() => rejectListing(listing.id)}
                                disabled={loadingListingId !== null}
                                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <XCircle className="h-4 w-4" />
                                {loadingListingId === listing.id ? "Rejet..." : "Rejeter"}
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => deleteListing(listing.id)}
                            disabled={loadingListingId !== null}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="h-4 w-4" />
                            {loadingListingId === listing.id ? "Suppression..." : "Supprimer"}
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          Créée le {new Date(listing.created_at).toLocaleDateString("fr-MA")} à{" "}
                          {new Date(listing.created_at).toLocaleTimeString("fr-MA")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
